import { UserEntity } from '../entities/user.entity'

export class UserCreateDomain {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  toEntity(): UserEntity {
    const userEntity = new UserEntity()
    userEntity.name = this.name
    userEntity.email = this.email
    userEntity.password = this.password
    return userEntity
  }
}
