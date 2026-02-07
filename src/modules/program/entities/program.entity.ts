import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_programs')
export class Program {
  @PrimaryGeneratedColumn()
  id_program: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  name_program: string;
  @Column({ type: 'varchar', length: 500, nullable: true })
  description: string;
  @Column({ type: 'varchar', length: 15, nullable: true })
  primary_color: string;
  @Column({ type: 'varchar', length: 15, nullable: true })
  secondary_color: string;
  @Column({ type: 'boolean', default: true })
  status: boolean;
}
