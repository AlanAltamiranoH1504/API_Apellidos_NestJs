import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ListProductsDto } from './dto/list-products.dto';
import { FindProgramDto } from './dto/find-program.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const name_in_use = await this.name_in_use_by_id_program(
      createProductDto.name_product,
      createProductDto.id_program,
    );
    if (name_in_use) {
      throw new HttpException(
        'Existe un producto con el mismo nombre dentro de ese programa',
        HttpStatus.CONFLICT,
      );
    }
    const producto_to_save = this.productRepository.create({
      ...createProductDto,
      program: {
        id_program: createProductDto.id_program,
      },
    });
    await this.productRepository.save(producto_to_save);
    return {
      status: true,
      message: 'Producto creado correctamente',
    };
  }

  async findAll(listProductsDto: ListProductsDto) {
    const list_products = await this.productRepository.find({
      where: {
        status: listProductsDto.status,
        program: {
          id_program: listProductsDto.id_program,
        },
      },
    });
    if (list_products.length === 0) {
      throw new HttpException(
        'No se encontraron registros en la base de datos',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      products: list_products,
      total: list_products.length,
    };
  }

  async findOne(id: number, findProductDto: FindProgramDto) {
    const program_to_show = await this.productRepository.findOne({
      where: {
        id_product: id,
        program: {
          id_program: findProductDto.id_program,
        },
        status: true,
      },
    });
    if (!program_to_show) {
      throw new HttpException(
        'El producto no fue encontrado',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      product: program_to_show,
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const name_in_use = await this.name_in_use_general(
      updateProductDto.name_product,
      updateProductDto.id_program,
      id,
    );
    if (name_in_use) {
      throw new HttpException(
        'El nombre del producto ya se encuentra en uso',
        HttpStatus.CONFLICT,
      );
    }
    const product_to_update = await this.productRepository.findOne({
      where: {
        id_product: id,
        program: {
          id_program: updateProductDto.id_program,
        },
      },
    });
    if (!product_to_update) {
      throw new HttpException('Producto no registrado', HttpStatus.NOT_FOUND);
    }
    product_to_update.name_product = updateProductDto.name_product;
    product_to_update.description = updateProductDto.description;
    product_to_update.status = updateProductDto.status;
    product_to_update.price = updateProductDto.price;
    product_to_update.stock = updateProductDto.stock
      ? updateProductDto.stock
      : product_to_update.stock;

    await this.productRepository.save(product_to_update);
    return {
      status: true,
      message: 'Producto actualizado correctamente',
    };
  }

  async remove(id: number, removeProductDto: FindProgramDto) {
    const product_to_delete = await this.findOne(id, removeProductDto);
    product_to_delete.product.status = false;
    await this.productRepository.save(product_to_delete.product);
    return {
      status: true,
      message: 'Producto eliminado correctamente',
    };
  }

  async name_in_use_by_id_program(product_name: string, id_program: number) {
    const name_in_use = await this.productRepository.findOne({
      where: {
        name_product: product_name,
        program: {
          id_program: id_program,
        },
      },
    });
    if (name_in_use) {
      return true;
    }
    return false;
  }

  async name_in_use_general(
    product_name: string,
    id_program: number,
    id_product: number,
  ) {
    const name_in_use = await this.productRepository.findOne({
      where: {
        name_product: product_name,
        program: {
          id_program: id_program,
        },
      },
    });

    if (name_in_use && name_in_use.id_product !== id_product) {
      return true;
    }
    return false;
  }
}
