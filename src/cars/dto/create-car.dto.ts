import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateCarDto {
  @IsString()
  number: string;

  @IsNumber()
  modelId: number;

  @IsString()
  color: string;

  @IsString()
  year: string;

  @IsNumber()
  priceId: number;
}
