import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramDto } from './create-program.dto';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateProgramDto {
  @IsNotEmpty({ message: 'El nombre del programa es obligatorio' })
  @IsString({ message: 'El nombre del programa debe ser una cadena de texto' })
  @Length(3, 100, {
    message:
      'El nombre del programa no debe ser mayor a 100 caracteres y minimo 3',
  })
  name_program: string;

  @IsOptional()
  @IsString({ message: 'La descripcion debe ser una cadena de texto' })
  @Length(1, 500, {
    message: 'La longitud maxima de descripcion es de 500 caracteres',
  })
  description: string;

  @IsOptional()
  @IsString({ message: 'El color primario debe ser una cadena de texto' })
  @Length(3, 15, {
    message: 'El color primario debe ser en formato hexadecimal',
  })
  primary_color: string;

  @IsOptional()
  @IsString({ message: 'El color secundario debe ser una cadena de texto' })
  @Length(3, 15, {
    message: 'El color secundario debe ser en formato hexadecimal',
  })
  secondary_color: string;

  @IsNotEmpty({ message: 'El estado es requerido' })
  @IsBoolean({ message: 'El estado solo puede ser true/false' })
  status: boolean;
}
