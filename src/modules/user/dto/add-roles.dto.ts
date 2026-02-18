import { ArrayNotEmpty, IsArray, IsInt, IsPositive } from 'class-validator';

export class AddRolesDto {
  @IsArray({ message: 'Los roles deben encontrarse en un array' })
  @ArrayNotEmpty({ message: 'El array se encuentra vacio' })
  @IsInt({
    each: true,
    message: 'Los elementos del array debe ser nuemero enteros',
  })
  @IsPositive({
    each: true,
    message: 'Los elementos del array deben ser numeros positivos',
  })
  id_roles: number[];
}
