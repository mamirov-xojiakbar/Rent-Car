import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsOptional,
  IsBoolean,
  IsPhoneNumber,
} from 'class-validator';

export class CreateAdminDto {
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

  @IsOptional()
  @IsString()
  is_active: boolean;

  @IsOptional()
  @IsBoolean()
  is_creator: boolean;
}
