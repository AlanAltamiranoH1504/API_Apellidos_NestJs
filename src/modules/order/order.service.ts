import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { ClientsService } from '../clients/clients.service';
import { v4 as uuid } from 'uuid';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly clientService: ClientsService,
    private readonly productService: ProductService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepository.manager.transaction(async (manager) => {
      const user = await this.clientService.findOne(createOrderDto.client);
      const order_to_save = manager.create(Order, {
        client: {
          id_client: user.client.id_client,
        },
        sku: uuid(),
      });
      await manager.save(order_to_save);
      for (const product of createOrderDto.products) {
        const product_to_found = await this.productService.findOne(product, {
          id_program: 1,
        });
        await this.dataSource.query(
          `INSERT INTO tbl_orders_products(id_order, id_product) VALUES (?, ?)`,
          [order_to_save.id_order, product_to_found.product.id_product],
        );
      }
      return {
        status: true,
        message: 'Orden creada correctamente',
      };
    });
  }

  async findAll() {

  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
