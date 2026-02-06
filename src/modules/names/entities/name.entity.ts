import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_names')
export class Name {
  @PrimaryGeneratedColumn()
  id_name: number;

  @Column({ type: 'varchar', length: 70, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  surnames: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;
}
