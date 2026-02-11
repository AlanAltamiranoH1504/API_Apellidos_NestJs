import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Program } from '../../program/entities/program.entity';

@Entity('tbl_rols')
export class Rol {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name_rol: string;
  @Column({ type: 'boolean', default: true })
  status: boolean;

  // * Un rol pertenece a un programa
  @ManyToOne(() => Program, (program) => program.rols)
  @JoinColumn({ name: 'id_program' })
  program: Program;
}
