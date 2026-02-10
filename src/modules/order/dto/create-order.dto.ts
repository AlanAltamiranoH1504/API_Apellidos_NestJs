import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'El ciente es obligatorio' })
  @IsPositive({ message: 'El cliente no es valido' })
  @IsInt({ message: 'El cliente es valido' })
  client: number;

  @IsNotEmpty({ message: 'Los productos son requeridos' })
  @IsArray({ message: 'Los productos debe ser un arreglo' })
  @ArrayNotEmpty({ message: 'El array no puede estar vacio' })
  products: number[];
}
