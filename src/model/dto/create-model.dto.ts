import { IsString, IsNotEmpty } from 'class-validator';

export class CreateModelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  markaId: number;
}
