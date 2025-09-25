import type { Uuid } from '../../../common/types';
import { User } from '../domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: Uuid;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  lastName: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  picture?: string | null;

  @ApiProperty({
    example: 'john@yopmail.com',
    description: 'Email address of the user',
  })
  email: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Creation date',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Last update date',
  })
  updatedAt: Date;

  static fromDomain(user: User): UserDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      picture: user.picture ?? null,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static fromDomains(users: User[]): UserDto[] {
    return users.map((user) => this.fromDomain(user));
  }
}
