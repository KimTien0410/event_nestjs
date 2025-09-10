import { UserEntity } from '../entities/user.entity'
import { UserUpdateDto } from '../dto/user-update.dto'

export class UserUpdate {
  public readonly name?: string

  constructor(props: { name?: string }) {
    this.name = props.name
  }

  static toEntity(
    existing: UserEntity,
    userUpdateDto: UserUpdateDto,
  ): Partial<UserEntity> {
    if (userUpdateDto.name !== undefined) {
      existing.name = userUpdateDto.name
    }

    return existing
  }
}
