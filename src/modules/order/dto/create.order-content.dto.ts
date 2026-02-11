import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderContentDto {
  @IsNotEmpty({ message: 'El id del producto es requerido' })
  @IsInt({ message: 'El id del producto debe ser un numero entero' })
  @IsPositive({ message: 'Id de producto no valido' })
  id_product: number;

  @IsNotEmpty({ message: 'La cantidad es requerida' })
  @IsInt({ message: 'La cantidad debe ser un numero entero' })
  @IsPositive({ message: 'La cantidad no es valida' })
  quantity: number;

  @IsNotEmpty({ message: 'El monto es oblogatorio' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El monto debe ser un numero con maximo 2 decimales' },
  )
  @IsPositive({ message: 'El monto debe ser positivo' })
  amount: number;
}
