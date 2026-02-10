import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'El nombre del producto es requerido' })
  @IsString({ message: 'El nombre del producto debe ser una cadena de texto' })
  @Length(3, 100, {
    message: 'La longitud del nombre no debe ser superior a 100 caracteres',
  })
  name_product: string;

  @IsNotEmpty({ message: 'La descripción del producto es requireda' })
  @IsString({
    message: 'La descripción del producto debe ser una cadena de texto',
  })
  @Length(3, 500, {
    message: 'La descripción no debe ser mayor a 500 caracteres',
  })
  description: string;

  @IsNotEmpty({ message: 'El precio es requerido' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe se un valor numerido de maximo 2 decimales' },
  )
  price: number;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'El stock debe ser un numero entero' },
  )
  stock?: number;

  @IsNotEmpty({ message: 'El programa es obligatorio' })
  @IsInt({ message: 'El id del programa debe ser un numero entero' })
  id_program: number;
}
