import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginWorkerDto {
  @IsEmail()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
