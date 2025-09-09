import { User } from '../domain/user'
import { UserDto } from './user.dto'
import { UserEntity } from '../entities/user.entity'

export class UserMapper {
  /** Convert User -> UserDto */
  static toDto(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
  /** Convert UserEntity -> User */
  static toDomain(userEntity: UserEntity): User {
    return new User(
      userEntity.id,
      userEntity.name,
      userEntity.email,
      userEntity.role,
      userEntity.password,
      userEntity.createdAt,
      userEntity.updatedAt,
    )
  }
  /** Convert UserDomain -> UserEntity */
  static toEntity(user: User): UserEntity {
    const userEntity = new UserEntity()
    userEntity.id = user.id
    userEntity.name = user.name
    userEntity.email = user.email
    userEntity.role = user.role
    userEntity.password = user.password
    userEntity.createdAt = user.createdAt
    userEntity.updatedAt = user.updatedAt
    return userEntity
  }
}
