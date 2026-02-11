import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { CreateOrderContentDto } from './create.order-content.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'El ciente es obligatorio' })
  @IsPositive({ message: 'El cliente no es valido' })
  @IsInt({ message: 'El cliente es valido' })
  client: number;

  @ValidateNested({ each: true, message: 'Los productos son requeridos' })
  @Type(() => CreateOrderContentDto)
  @IsArray({ message: 'Los productos debe ser un arreglo' })
  @ArrayNotEmpty({ message: 'El array de productos no puede estar vacio' })
  products: CreateOrderContentDto[];
}
