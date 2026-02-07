import { IsInt, IsNotEmpty } from 'class-validator';

export class FindProgramDto {
  @IsNotEmpty({ message: 'El id del programa es requerido' })
  @IsInt({ message: 'El id del programa debe ser un valor entero' })
  id_program: number;
}
