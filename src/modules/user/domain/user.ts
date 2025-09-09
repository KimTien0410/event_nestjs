import { UserEntity } from '../entities/user.entity'

export class User {
  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
    public password: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static toDomain(userEntity: UserEntity) {
    return new User(
      userEntity.id,
      userEntity.name,
      userEntity.email,
      userEntity.password,
      userEntity.createdAt,
      userEntity.updatedAt,
    )
  }
}
