import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ListClientsDto {
  @IsNotEmpty({ message: 'El estado es requerido' })
  @IsBoolean({ message: 'El estado solo puede ser true/false' })
  status: boolean;
}
