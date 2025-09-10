import { UserEntity } from '../entities/user.entity';
import { UserUpdateDto } from '../dto/user-update.dto';

export class UserUpdate {
  public readonly name?: string;

  static toEntity(userEntity:UserEntity, userUpdateDto: UserUpdateDto): Partial<UserEntity> {
    return {
      id: userEntity.id,
      email: userEntity.email,
      password: userEntity.password,
      name: userUpdateDto.name ?? userEntity.name,
      createdAt: userEntity.createdAt ?? new Date(userEntity.createdAt),
      updatedAt: new Date(),
    };
  }
}
