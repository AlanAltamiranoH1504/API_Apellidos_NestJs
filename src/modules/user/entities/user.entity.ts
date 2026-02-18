import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Program } from '../../program/entities/program.entity';
import { Rol } from '../../rols/entities/rol.entity';

@Entity('tbl_users')
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name_user: string;
  @Column({ type: 'varchar', length: 200, nullable: false })
  lastname: string;
  @Column({ type: 'varchar', length: 70, nullable: false, unique: true })
  email: string;
  @Column({ type: 'varchar', length: 70, nullable: false })
  password: string;
  @Column({ type: 'varchar', length: 250, nullable: true })
  img_profile: string;
  @Column({ type: 'int', default: true })
  status: boolean;

  // * Un usuario pertenece a un programa
  @ManyToOne(() => Program, (program) => program.users)
  @JoinColumn({ name: 'id_program' })
  program: Program;

  // * Un usuario puede tener muchos roles
  @ManyToMany(() => Rol, (rol) => rol.users)
  rols: Rol[];
}
