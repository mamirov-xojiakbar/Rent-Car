import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class CreateWorkerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  confirm_password: string;

  @IsPhoneNumber("UZ")
  phone: string;

  @IsString()
  @IsOptional()
  photo: string

  @IsOptional()
  @IsString()
  is_active: boolean;
}