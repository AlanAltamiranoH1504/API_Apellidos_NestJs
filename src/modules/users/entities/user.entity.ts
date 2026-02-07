import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_users')
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;
  @Column({ type: 'varchar', length: 70, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 100, nullable: false })
  surnames: string;
  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;
  @Column({ type: 'date', nullable: false })
  birth_dat: Date;
  @Column({ type: 'boolean', default: true })
  status: boolean;
}
