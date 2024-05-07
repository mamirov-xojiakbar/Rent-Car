import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginClientDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
