import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('tbl_orders')
export class Order {
  @PrimaryGeneratedColumn()
  id_order: number;

  @Column({ type: 'uuid', length: 100, nullable: false })
  sku: string;
  @Column({ type: 'boolean', default: true })
  status: boolean;

  // * Una orden pertenece a un client
  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: 'id_client' })
  client: Client;

  // * Una orden puede tener varios productos
  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable({ name: 'tbl_orders_products' })
  products: Product[];
}
