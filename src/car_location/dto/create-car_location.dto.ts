import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCarLocationDto {
  @IsInt()
  carId: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsString()
  @IsNotEmpty()
  date_time: string;
}
