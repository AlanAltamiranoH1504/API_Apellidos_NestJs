import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { OrderContent } from './order-content.entity';

@Entity('tbl_orders')
export class Order {
  @PrimaryGeneratedColumn()
  id_order: number;

  @Column({ type: 'uuid', length: 100, nullable: false })
  sku: string;

  @Column({ type: 'double', nullable: false })
  total_amount: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  // * Una orden pertenece a un client
  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: 'id_client' })
  client: Client;

  // * Una orden puede tener varias lineas de contenido
  @OneToMany(() => OrderContent, (order_content) => order_content.order, {
    cascade: true,
  })
  contenido: OrderContent[];
}
