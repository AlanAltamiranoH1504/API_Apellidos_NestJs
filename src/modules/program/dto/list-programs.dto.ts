import { IsBoolean, IsNotEmpty } from 'class-validator';

export class ListProgramsDto {
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsBoolean({ message: 'El estado solo puede ser true/false' })
  status: true;
}
