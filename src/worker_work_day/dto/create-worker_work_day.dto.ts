import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkerWorkDayDto {
  @IsInt()
  @IsNotEmpty()
  weekDayId: number;

  @IsInt()
  @IsNotEmpty()
  workerId: number;

  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;
}
