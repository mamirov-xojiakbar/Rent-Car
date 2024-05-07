import {
  IsInt,
  IsString,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  orderId: number;

  @IsString()
  @IsNotEmpty()
  method: string;

  @IsNumber()
  amount: number;

  date: string;
}
