import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UpdateRolDto {
  @IsNotEmpty({ message: 'El nombre del rol es requerido' })
  @IsString({ message: 'El nombre del rol debe ser una cadena de texto' })
  @Length(3, 50, { message: 'El rol no debe tener mas de 50 caracteres' })
  @Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, {
    message: 'El rol solo puede tener letras',
  })
  name_rol: string;

  @IsNotEmpty({ message: 'El id del programa es requerido' })
  @IsInt({ message: 'El id del programa debe ser un valor entero' })
  @IsPositive({ message: 'Id de programa no valido' })
  id_program: number;

  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsBoolean({ message: 'El estado del rol solo puede ser true/false' })
  status: number;
}
