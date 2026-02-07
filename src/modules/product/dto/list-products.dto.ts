import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class ListProductsDto {
  @IsNotEmpty({ message: 'El estado es requerido' })
  @IsBoolean({ message: 'El estado solo puede tener un valor true/false' })
  status: boolean;

  @IsNotEmpty({ message: 'El id de programa es requerido' })
  @IsInt({ message: 'El id de programa debe ser un numero entero' })
  id_program: number;
}
