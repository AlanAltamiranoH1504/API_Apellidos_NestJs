import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNameDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name: string;

  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  @IsString({ message: 'Los apellidos debe ser una cadena de texto' })
  surnames: string;
}
