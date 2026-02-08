import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';

@Entity('tbl_address')
export class Adress {
  @PrimaryGeneratedColumn()
  id_address: number;

  @Column({ type: 'varchar', length: 150, nullable: false })
  address: string;
  @Column({ type: 'varchar', length: 150, nullable: false })
  neighborhood: string;
  @Column({ type: 'varchar', length: 70, nullable: false })
  city: string;
  @Column({ type: 'int', nullable: false })
  zip_code: number;
  @Column({ type: 'boolean', default: true })
  status: string;

  // * Una direccion para un cliente
  @OneToOne(() => Client, (client) => client.address)
  @JoinColumn({ name: 'id_client' })
  client: Client;
}
