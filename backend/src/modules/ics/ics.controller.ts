import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { IcsService } from './ics.service';
import type { Response } from 'express';
import type { Uuid } from 'src/common/types';

@Controller('calendars')
export class IcsController {
  constructor(private readonly icsService: IcsService) {}

  @Get('users/:userId/calendar.ics')
  async getIcsFile(@Param('userId') userId: Uuid, @Res() res: Response) {
    const icsContent = await this.icsService.getEventsByUser(userId);

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `inline; filename=user-${userId}-events.ics`,
    );

    res.send(icsContent);
  }
}
