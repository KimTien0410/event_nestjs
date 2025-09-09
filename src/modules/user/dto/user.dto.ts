import { User } from '../domain/user'
import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty()
  id: number

  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  name: string

  @ApiProperty({
    example: 'john@yopmail.com',
    description: 'Email address of the user',
  })
  email: string

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Creation date',
  })
  createdAt: Date

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Last update date',
  })
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
