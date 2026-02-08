import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Adress } from '../../adress/entities/adress.entity';

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
}
