import { IsNumber, IsPositive, Min } from 'class-validator';

export class CreateCarPriceDto {
  @IsNumber()
  per_hour: number;

  @IsNumber()
  per_day: number;

  @IsNumber()
  per_month: number;
}
