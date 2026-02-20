import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail({}, { message: 'El email no es valido' })
  email: string;

  @IsNotEmpty({ message: 'El password requerido' })
  @IsString({ message: 'El password debe ser una cadena de caracteres' })
  password: string;
}
