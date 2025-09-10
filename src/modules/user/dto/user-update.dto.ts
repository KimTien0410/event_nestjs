import { IsOptional, IsString } from 'class-validator'
import { UserUpdate } from '../domain/user-update.domain'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UserUpdateDto {
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @IsOptional()
  @IsString()
  name?: string;

  static toDomain(userUpdateDto: UserUpdateDto): UserUpdate {
    return { ...userUpdateDto }
  }
}
