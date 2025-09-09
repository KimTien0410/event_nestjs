import { UserEntity } from '../entities/user.entity'

export class User {
  readonly id: number

  readonly name: string

  readonly email: string

  readonly createdAt: Date

  readonly updatedAt: Date

  private constructor(props: {
    id: number
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
  }) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  /**
   * Map từ UserEntity sang UserDomain
   */
  static fromEntity(entity: UserEntity): User {
    return new User({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    })
  }
}
