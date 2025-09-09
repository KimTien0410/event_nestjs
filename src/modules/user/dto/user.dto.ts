import { User } from '../domain/user'

export class UserDto {
  id: number
  name: string
  email: string
  createdAt: Date
  updatedAt: Date

  static fromDomain(user: User): UserDto {
    const dto = new UserDto()
    dto.id = user.id
    dto.name = user.name
    dto.email = user.email
    dto.createdAt = user.createdAt
    dto.updatedAt = user.updatedAt
    return dto
  }
}
