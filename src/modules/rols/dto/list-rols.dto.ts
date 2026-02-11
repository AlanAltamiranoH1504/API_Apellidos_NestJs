import { IsBoolean, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class ListRolsDto {
  @IsNotEmpty({ message: 'El programa es requerido' })
  @IsInt({ message: 'El programa no es valido' })
  @IsPositive({ message: 'El programa debe ser un numero positivo' })
  id_program: number;

  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsBoolean({ message: 'El estado solo puede ser true/false' })
  status: boolean;
}
