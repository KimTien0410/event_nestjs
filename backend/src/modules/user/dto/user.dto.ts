import type { Uuid } from '../../../common/types';
import { User } from '../domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier of the user',
  })
  id: Uuid;

  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
  })
  lastName: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  fullName: string;

  @ApiProperty({
    example: 'https://example.com/profile.jpg',
    description: 'Profile picture of the user',
  })
  picture?: string | null;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Birthday of the user',
  })
  birthday?: string | null;

  @ApiProperty({
    example: '123-456-7890',
    description: 'Phone number of the user',
  })
  phoneNumber?: string | null;

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
      email: user.email,
      picture: user.picture,
      birthday: user.birthday,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static fromDomains(users: User[]): UserDto[] {
    return users.map((user) => this.fromDomain(user));
  }
}
