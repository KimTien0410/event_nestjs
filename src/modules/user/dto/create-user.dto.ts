import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { UserEntity } from '../entities/user.entity'
import { IsUnique } from '../../../common/validation/is-unique.decorator'

export class CreateUserDto {
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsUnique(UserEntity, 'email', { message: 'Email must be unique' })
  email: string

  @MinLength(6)
  password: string
}
