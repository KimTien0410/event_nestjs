import { UserEntity } from '../entities/user.entity';

export class UserUpdate {
  public readonly name?: string;

  static toEntity(userUpdate: UserUpdate): Partial<UserEntity> {
    return {
      name: userUpdate.name,
    };
  }
}
