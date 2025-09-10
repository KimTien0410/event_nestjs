import { UserEntity } from '../entities/user.entity'
import { UserUpdateDto } from '../dto/user-update.dto'

export class UserUpdate {
  public readonly name?: string;

  static toEntity(userUpdateDto: UserUpdateDto): Partial<UserEntity> {
    return {
      name: userUpdateDto.name
    };
  }
}
