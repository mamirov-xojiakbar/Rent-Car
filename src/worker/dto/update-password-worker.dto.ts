import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordWorkerDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  new_password: string;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}
