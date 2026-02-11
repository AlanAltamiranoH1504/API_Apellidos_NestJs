import { IsBoolean, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class ListOrderDto {
  @IsNotEmpty({ message: 'El id de programa es requerido' })
  @IsPositive({ message: 'El id de programa debe ser positivo' })
  @IsInt({ message: 'Id de programa no valido' })
  id_program: number;

  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsBoolean({ message: 'El estado solo puede ser true/false' })
  status: boolean;
}
