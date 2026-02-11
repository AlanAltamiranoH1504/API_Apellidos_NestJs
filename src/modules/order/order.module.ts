import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ClientsModule } from '../clients/clients.module';
import { ClientsService } from '../clients/clients.service';
import { ProductModule } from '../product/product.module';
import { OrderContent } from './entities/order-content.entity';

@Module({
  imports: [
    ClientsModule,
    ProductModule,
    TypeOrmModule.forFeature([Order, OrderContent]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
