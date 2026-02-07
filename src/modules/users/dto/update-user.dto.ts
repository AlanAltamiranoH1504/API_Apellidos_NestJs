import {
  IsBoolean,
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name: string;

  @IsNotEmpty({ message: 'Los apellidos son requeridos' })
  @IsString({ message: 'Los apellidos deben ser una cadena de texto' })
  surnames: string;

  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'El formato del email no es valido' })
  email: string;

  @IsNotEmpty({ message: 'La fecha de cumpleaños es obligatorio' })
  @IsISO8601({}, { message: 'El formato de fecha debe ser yyyy/mm/dd' })
  birth_dat: Date;

  @IsNotEmpty({ message: 'El status es requerido' })
  @IsBoolean({ message: 'El status solo puede ser un valor booleano' })
  status: boolean;
}
