import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

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

  // * Un programa tiene muchos productos
  @OneToMany(() => Product, (product) => product.program)
  products: Product[];
}
