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
import { UserEntity } from '../user/entities/user.entity';
import { AuthUser } from 'src/decorator/auth-user.decorator';
import { RequireLoggedIn } from 'src/guards/role-container';

@Controller('calendars')
export class IcsController {
  constructor(private readonly icsService: IcsService) {}

  @Get('calendar.ics')
  @RequireLoggedIn()
  async getIcsFile(@AuthUser() user: UserEntity, @Res() res: Response) {
    const icsContent = await this.icsService.getEventsByUser(user.id);

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `inline; filename=user-${user.id}-events.ics`,
    );

    res.send(icsContent);
  }
}
