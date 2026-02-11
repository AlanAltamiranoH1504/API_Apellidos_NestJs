import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Program } from '../../program/entities/program.entity';
import { Order } from '../../order/entities/order.entity';

@Entity('tbl_products')
export class Product {
  @PrimaryGeneratedColumn()
  id_product: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name_product: string;
  @Column({ type: 'varchar', length: 500, nullable: false })
  description: string;
  @Column({ type: 'double', nullable: false })
  price: number;
  @Column({ type: 'int', default: 1 })
  stock: number;
  @Column({ type: 'boolean', default: true })
  status: boolean;

  // * Un producto pertenece a un Programa (Many to One)
  @ManyToOne(() => Program, (program) => program.products)
  @JoinColumn({ name: 'id_program' })
  program: Program;
}
