import { IsBoolean, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class ListUsersDto {
  @IsNotEmpty({ message: 'El id del programa es requerido' })
  @IsInt({ message: 'El id del programa debe ser un valor entero' })
  @IsPositive({ message: 'Id de programa no valido' })
  id_program: number;

  @IsNotEmpty({ message: 'El estado es requerido' })
  @IsBoolean({ message: 'El estado debe ser true/false' })
  status: boolean;
}
