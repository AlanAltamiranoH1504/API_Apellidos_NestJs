import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { v4 as uuid } from 'uuid';
import { ProductService } from '../product/product.service';
import { Product } from '../product/entities/product.entity';
import { Client } from '../clients/entities/client.entity';
import { OrderContent } from './entities/order-content.entity';
import { ListOrderDto } from './dto/list-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderContent)
    private readonly orderContentRepository: Repository<OrderContent>,
    private readonly clientService: ClientsService,
    private readonly productService: ProductService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepository.manager.transaction(async (manager) => {
      const total_amount = createOrderDto.products.reduce((acum, product) => {
        return acum + product.amount;
      }, 0);

      // ! Busqueda de client
      const client = await manager.findOne(Client, {
        where: {
          id_client: createOrderDto.client,
        },
        relations: ['program'],
      });

      if (!client) {
        throw new HttpException(
          'El cliente no esta registrado en la base de datos',
          HttpStatus.NOT_FOUND,
        );
      }

      // ! Creacion de la orden
      const order = manager.create(Order, {
        client: {
          id_client: createOrderDto.client,
        },
        total_amount: total_amount,
        sku: uuid(),
      });
      await manager.save(order);

      // ! Creacion de registros de order
      for (const content of createOrderDto.products) {
        const product = await manager.findOneBy(Product, {
          program: {
            id_program: client.program.id_program,
          },
          id_product: content.id_product,
        });
        if (!product) {
          throw new HttpException(
            `El producto con id ${content.id_product}, no puede ser agregado en la orden`,
            HttpStatus.CONFLICT,
          );
        }

        // ! Validacion de stock
        if (product.stock < content.quantity) {
          throw new HttpException(
            `No existe suficiente stock para el producto ${product.name_product} con id ${product.id_product}`,
            HttpStatus.CONFLICT,
          );
        }
        // ! Actualizacion de stock
        product.stock = product.stock - content.quantity;
        await manager.save(product);

        // ! Guardado de contenido de orden
        const new_order_content = this.orderContentRepository.create({
          order: order,
          amount: product.price,
          quantity: content.quantity,
          product: product,
        });
        await manager.save(new_order_content);
      }
      return {
        status: true,
        message: 'Orden creada correctamente',
      };
    });
  }

  async findAll(listOrderDto: ListOrderDto) {
    const orders = await this.orderRepository.find({
      where: {
        status: listOrderDto.status,
      },
      relations: ['client', 'contenido.product'],
    });
    if (orders.length === 0) {
      throw new HttpException(
        'No existen ordenes registradas',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      orders,
      total: orders.length,
    };
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: {
        id_order: id,
      },
      relations: ['client', 'contenido.product'],
    });
    if (!order) {
      throw new HttpException(
        'La orden no fue encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      order,
    };
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    const order_to_delete = await this.findOne(id);
    order_to_delete.order.status = false;
    await this.orderRepository.save(order_to_delete.order);
    return {
      status: true,
      message: 'Orden eliminada correctamente',
    };
  }

  async delete(id: number) {
    const order_to_delete = await this.orderRepository.findOne({
      where: {
        id_order: id,
      },
    });
    if (!order_to_delete) {
      throw new HttpException(
        'La orden no fue encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.orderRepository.delete(id);
    return {
      status: true,
      message: 'Orden eliminada completamente',
    };
  }

  async findByClient(id: number) {
    const client = await this.clientService.findOne(id);
    const orders_by_client = await this.orderRepository.find({
      where: {
        client: {
          id_client: client.client.id_client,
          status: true,
        },
      },
      relations: ['contenido.product'],
      order: {
        crated_at: 'DESC',
      },
    });
    if (orders_by_client.length === 0) {
      throw new HttpException(
        'El cliente no tiene ordenes',
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      status: true,
      orders: orders_by_client,
      total: orders_by_client.length,
    };
  }
}
