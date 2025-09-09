import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { UserCreateDomain } from '../domain/user-create.domain'

export class UserCreateDto {
  @IsNotEmpty()
  name: string

  @IsEmail()
  email: string

  @MinLength(6)
  password: string

  static toDomain(userCreateDto: UserCreateDto): UserCreateDomain {
    return new UserCreateDomain(
      userCreateDto.name,
      userCreateDto.email,
      userCreateDto.password,
    )
  }
}
