import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Order } from './order.entity';

@Entity('tbl_order_content')
export class OrderContent {
  @PrimaryGeneratedColumn()
  id_order_content: number;

  @Column({ type: 'int', nullable: false, default: 1 })
  quantity: number;

  @Column({ type: 'double', nullable: false, precision: 2 })
  amount: number;

  // * Una linea de contenido pertenece a un producto
  @ManyToOne(() => Product, (product) => product.id_product)
  @JoinColumn({ name: 'id_product' })
  product: Product;

  // * Una linea de contenido pertenece a una orden
  @ManyToOne(() => Order, (order) => order.contenido)
  @JoinColumn({ name: 'id_order' })
  order: Order;
}
