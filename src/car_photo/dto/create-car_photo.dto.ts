import { IsInt, IsString, IsUrl } from 'class-validator';

export class CreateCarPhotoDto {
  @IsInt()
  carId: number;

  @IsString()
  link: string;
}
