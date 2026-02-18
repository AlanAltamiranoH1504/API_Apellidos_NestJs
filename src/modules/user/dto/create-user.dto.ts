import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre del usuario es requerido' })
  @IsString({ message: 'El nombre del usuario debe ser una cadena de texto' })
  @Length(3, 100, {
    message: 'El nombre de usuario debe ser maximo de 100 caracteres',
  })
  name_user: string;

  @IsNotEmpty({ message: 'Los apellidos del usuario es requerido' })
  @IsString({
    message: 'Los apellidos del usuario deben ser una cadena de texto',
  })
  @Length(3, 200, {
    message: 'Los apellidos del usuario deben ser maximo de 200 caracteres',
  })
  lastname: string;

  @IsNotEmpty({ message: 'El email es requerid' })
  @IsEmail({}, { message: 'El formato del email no es valido' })
  @Length(3, 70, { message: 'Longitud de email no valida' })
  email: string;

  @IsNotEmpty({ message: 'El password es requerido' })
  @IsString({ message: 'El password debe ser una cadena de caracteres' })
  @Length(8, 70, { message: 'El password debe tener al menos 8 caracteres' })
  password: string;

  @IsOptional()
  img_profile: string;

  @IsNotEmpty({ message: 'El programa es requerido' })
  @IsInt({ message: 'El programa debe ser un valor entero' })
  @IsPositive({ message: 'El programa no es valido' })
  id_program: number;

  @IsNotEmpty({ message: 'El rol es requerido' })
  @IsInt({ message: 'El rol debe ser un valor entero' })
  @IsPositive({ message: 'El rol no es valido' })
  id_rol: number;
}
