import {RegisterForm} from "../domain/register-form";
import {Gender} from "../../user/domain/gender";
import _ from "lodash";
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RegisterFormDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'Password for the user account (minimum 6 characters)',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    example: Gender.FEMALE,
    description: 'Gender of the user',
  })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiPropertyOptional({
    example: '1990-01-01',
    description: 'Birthday of the user in YYYY-MM-DD format',
  })
  @IsString()
  @IsOptional()
  birthday?: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Phone number of the user',
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  public static toRegisterForm(registerFormDto: RegisterFormDto): RegisterForm {
      return {
        firstName: registerFormDto.firstName,
        lastName: registerFormDto.lastName,
        email: registerFormDto.email,
        password: registerFormDto.password,
        gender: registerFormDto.gender,
        birthday: registerFormDto.birthday,
        phoneNumber: registerFormDto.phoneNumber,
      };
  }
}
