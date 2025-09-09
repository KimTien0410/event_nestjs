import { UserEntity } from '../entities/user.entity'
import { UserUpdateDto } from '../dto/user-update.dto'

export class UserUpdateDomain {
  constructor(
    public readonly id: number,
    public name?: string,
  ) {}

  toEntity(existing: UserEntity, userUpdateDto: UserUpdateDto): UserEntity {
    if (userUpdateDto.name !== undefined) {
      existing.name = userUpdateDto.name
    }

    return existing
  }
}
