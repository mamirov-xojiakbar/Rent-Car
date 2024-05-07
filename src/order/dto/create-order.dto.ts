import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @IsNotEmpty()
  clientId: number;

  @IsInt()
  @IsNotEmpty()
  carId: number;

  @IsString()
  @IsNotEmpty()
  start_date: string;

  @IsString()
  @IsNotEmpty()
  end_date: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  total_price: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  deposit: number;

  @IsInt()
  @IsNotEmpty()
  statusId: number;

  @IsInt()
  @IsNotEmpty()
  workerId: number;
}
