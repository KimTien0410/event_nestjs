import { IsOptional, IsString } from 'class-validator'
import { UserUpdateDomain } from '../domain/user-update.domain'

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  name?: string

  static toDomain(userUpdateDto: UserUpdateDto, id: number): UserUpdateDomain {
    return new UserUpdateDomain(id, userUpdateDto.name)
  }
}
