import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: 'La dirección es requerida' })
  @IsString({ message: 'La direccion debe ser una cadena de texto' })
  @Length(1, 150, { message: 'La direccion debe tener maximo 150 caracteres' })
  address: string;

  @IsNotEmpty({ message: 'La colonia es requerida' })
  @IsString({ message: 'La colonia debe ser una cadena de texto' })
  @Length(1, 150, { message: 'La colonia debe tener maximo 150 caracteres' })
  neighborhood: string;

  @IsNotEmpty({ message: 'La ciudad es requerida' })
  @IsString({ message: 'La ciudad debe ser una cadena de texto' })
  @Length(1, 70, { message: 'La ciudad debe tener maximo 70 caracteres' })
  city: string;

  @IsNotEmpty({ message: 'El codigo postal es requerido' })
  @IsString({ message: 'El codigo postal debe ser un texto' })
  @Length(1, 10, {
    message: 'El codigo postal no debe tener mas de 10 numeros',
  })
  @Matches(/^\d+$/, {
    message: 'El codigo postal solo puede tener numeros',
  })
  zip_code: string;
}
