import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { GoogleCalendarService } from './google-calendar.service';
import { EventDto } from '../event/dto/event.dto';
import { Uuid } from 'src/common/types';
import { RequireLoggedIn } from 'src/guards/role-container';
import { UserEntity } from '../user/entities/user.entity';
import { AuthUser } from 'src/decorator/auth-user.decorator';
import { GoogleCalendarImportDto } from './dto/google-token-form.dto';

@Controller('google-calendar')
export class GoogleCalendarController {
  constructor(private readonly googleCalendarService: GoogleCalendarService) {}

  @Post('import')
  @RequireLoggedIn()
  async importCalendar(
    @AuthUser() user: UserEntity,
    @Body() googleCalendarImportDto: GoogleCalendarImportDto,
  ): Promise<EventDto[]> {
    const userId: Uuid = user.id;
    const events = await this.googleCalendarService.importCalendarWithPLimit(
      userId,
      GoogleCalendarImportDto.toGoogleCalendarImport(googleCalendarImportDto),
    );
    return EventDto.fromDomains(events);
  }
}
