import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ListProductsDto } from './dto/list-products.dto';
import { IdValidationPipe } from '../../utils/pipes/id-validation/id-validation.pipe';
import { FindProgramDto } from './dto/find-program.dto';

@Controller('/api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/save')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('/list')
  findAll(@Body() listProductsDto: ListProductsDto) {
    return this.productService.findAll(listProductsDto);
  }

  @Get('/find/:id')
  findOne(
    @Param('id', IdValidationPipe) id: string,
    @Body() findProductDto: FindProgramDto,
  ) {
    return this.productService.findOne(+id, findProductDto);
  }

  @Put('/update/:id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete('/delete/:id')
  remove(
    @Param('id', IdValidationPipe) id: string,
    @Body() removeProductDto: FindProgramDto,
  ) {
    return this.productService.remove(+id, removeProductDto);
  }
}
