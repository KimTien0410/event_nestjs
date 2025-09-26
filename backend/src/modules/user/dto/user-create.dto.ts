import { UserCreate } from '../domain/user-create';
import { Gender } from '../domain/gender';
import _ from 'lodash';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the user',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: Gender.MALE,
    description: 'Gender of the user',
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Birthday of the user',
  })
  @IsOptional()
  @IsString()
  birthday?: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the user',
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  static toUserCreate(userCreateDto: UserCreateDto): UserCreate {
    return {
      firstName: userCreateDto.firstName,
      lastName: userCreateDto.lastName,
      email: _.toLower(userCreateDto.email),
      gender: userCreateDto.gender,
      birthday: userCreateDto.birthday,
      phoneNumber: userCreateDto.phoneNumber,
    };
  }
}
