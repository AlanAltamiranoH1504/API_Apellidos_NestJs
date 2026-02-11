import {
  IsAlpha,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateRolDto {
  @IsNotEmpty({ message: 'El nombre del rol es requerido' })
  @IsString({ message: 'El nombre del rol debe ser una cadena de texto' })
  @Length(3, 50, {
    message:
      'El nombre del rol debe tener una longitud de entre 3 y 50 caracteres',
  })
  @Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, {
    message: 'El rol solo puede tener letras',
  })
  name_rol: string;

  @IsNotEmpty({ message: 'El id del programa es requerido' })
  @IsInt({ message: 'El programa no es valido' })
  @IsPositive({ message: 'El programa no es valido' })
  id_program: number;
}
