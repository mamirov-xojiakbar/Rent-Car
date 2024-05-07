import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsOptional,
  IsPhoneNumber,
  IsBoolean,
} from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  confirm_password: string;

  @IsOptional()
  @IsString()
  photo: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @IsNotEmpty()
  @IsString()
  passport: string;

  @IsNotEmpty()
  @IsBoolean()
  license: boolean;
}
