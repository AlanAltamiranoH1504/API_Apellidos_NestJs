import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adress } from '../../adress/entities/adress.entity';
import { Order } from '../../order/entities/order.entity';
import { Program } from '../../program/entities/program.entity';

@Entity('tbl_clients')
export class Client {
  @PrimaryGeneratedColumn()
  id_client: number;

  @Column({ type: 'varchar', length: 70, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  surnames: string;
  @Column({ type: 'varchar', length: 70, unique: true })
  email: string;
  @Column({ type: 'varchar', length: 70, nullable: false })
  password: string;
  @Column({ type: 'date', nullable: true })
  birthday: Date;
  @Column({ type: 'boolean', default: true })
  status: boolean;

  // * Un cliente para una direccion
  @OneToOne(() => Adress, (address) => address.client, { cascade: true })
  address: Adress;

  // * Un cliente para muchas ordenes
  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  // * Un cliente pertenece a un programa
  @ManyToOne(() => Program, (program) => program.clients)
  @JoinColumn({ name: 'id_program' })
  program: Program;
}
