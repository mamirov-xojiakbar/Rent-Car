import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAdminDto {
  @IsEmail()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
