import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWeekDayDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
