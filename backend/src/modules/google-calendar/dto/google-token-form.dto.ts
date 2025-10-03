import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { GoogleCalendarImport } from '../domain/google-calendar-import';

export class GoogleCalendarImportDto {
  @ApiProperty({
    example: 'xxxxxxxxxxxx',
    description: 'Access Token',
  })
  @IsString()
  accessToken: string;

  static toGoogleCalendarImport(
    dto: GoogleCalendarImportDto,
  ): GoogleCalendarImport {
    return {
      accessToken: dto.accessToken,
    };
  }
}
