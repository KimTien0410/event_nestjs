import { UserUpdate } from '../domain/user-update';
import { Gender } from '../domain/gender';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @ApiPropertyOptional({
    example: 'John',
    description: 'First name of the user',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'Last name of the user',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    example: Gender.MALE,
    description: 'Gender of the user',
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional({
    example: '1990-01-01',
    description: 'Birthday of the user',
  })
  @IsOptional()
  @IsString()
  birthday?: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Phone number of the user',
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  static toUserUpdate(userUpdateDto: UserUpdateDto): UserUpdate {
    return {
      firstName: userUpdateDto.firstName,
      lastName: userUpdateDto.lastName,
      gender: userUpdateDto.gender,
      birthday: userUpdateDto.birthday,
      phoneNumber: userUpdateDto.phoneNumber,
    };
  }
}
