import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { UserCreate } from '../domain/user-create.domain'
import { ApiProperty } from '@nestjs/swagger'

export class UserCreateDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john@yopmail.com',
    description: 'Email address of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Password of the user (minimum 6 characters)',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  static toUserCreate(userCreateDto: UserCreateDto): UserCreate {
    return {
      name: userCreateDto.name,
      email: userCreateDto.email,
      password: userCreateDto.password
    };
  }
}
