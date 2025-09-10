import { UserEntity } from '../entities/user.entity'
import { UserUpdateDto } from '../dto/user-update.dto'

export class UserUpdate {
  public readonly name?: string;

  static toEntity(userEntity:UserEntity, userUpdateDto: UserUpdateDto): Partial<UserEntity> {
    return {
      ...userEntity,
      name: userUpdateDto.name
    };
  }
}
