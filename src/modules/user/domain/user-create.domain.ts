import { UserEntity } from '../entities/user.entity';

export class UserCreate {
  public readonly email: string;

  public readonly name: string;

  public readonly password: string;

  static toEntity(userCreate: UserCreate): Partial<UserEntity> {
    return {
      name: userCreate.name,
      email: userCreate.email,
      password: userCreate.password,
    };
  }
}
