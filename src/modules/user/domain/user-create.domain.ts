import { UserEntity } from '../entities/user.entity'

export class UserCreate {
  public readonly email: string
  public readonly name: string
  public readonly password: string

  constructor(props: { name: string; email: string; password: string }) {
    this.name = props.name
    this.email = props.email
    this.password = props.password
  }

  static toEntity(userCreate: UserCreate): Partial<UserEntity> {
    return {
      name: userCreate.name,
      email: userCreate.email,
      password: userCreate.password,
    }
  }
}
