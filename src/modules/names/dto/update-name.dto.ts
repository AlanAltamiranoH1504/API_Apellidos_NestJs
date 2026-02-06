import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateNameDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name: string;

  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  @IsString({ message: 'Los apellidos debe ser una cadena de texto' })
  surnames: string;

  @IsNotEmpty({ message: 'El status es obligatorio' })
  @IsBoolean({ message: 'El status debe ser un valor true/false' })
  status: boolean;
}
