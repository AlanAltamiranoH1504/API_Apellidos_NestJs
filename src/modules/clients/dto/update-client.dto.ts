import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './create-address-dto';

export class UpdateClientDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 70, { message: 'El nombre debe tener maximo 70 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'Los apellidos son requeridos' })
  @IsString({ message: 'Los apellidos debe ser una cadena de texto' })
  @Length(3, 70, {
    message: 'Los apellidos deben tener un maximo de 100 caracteres',
  })
  surnames: string;

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'El formato de e-mail no es valido' })
  email: string;

  @IsNotEmpty({ message: 'El password es requerido' })
  @Length(8, 70, { message: 'El password debe tener al menos 8 caracteres' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña es muy debil, debe tener mayusculas, minusculas, numeros o simbolos',
  })
  password: string;

  @IsOptional()
  @IsISO8601({}, { message: 'El formato de de fecha debe ser YYYY/mm/dd' })
  birthday: string;

  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsBoolean({ message: 'El estado solo puede ser true/false' })
  status: boolean;

  @IsDefined({ message: 'La direccion es obligatoria' })
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
