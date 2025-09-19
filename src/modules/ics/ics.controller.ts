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

@Controller('ics')
export class IcsController {
  constructor(private readonly icsService: IcsService) {}

  @Get(':eventId.ics')
  async getIcsFile(@Param('eventId') eventId: number, @Res() res: Response) {
    const icsContent = await this.icsService.generateIcsContent(eventId);

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `inline; filename=event-${eventId}.ics`,
    );
    res.send(icsContent);
  }
}
