import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventCreateDto } from './dto/event-create.dto';
import { EventUpdateDto } from './dto/event-update.dto';
import { EventDto } from './dto/event.dto';
import type { Uuid } from 'src/common/types';
import { RequireAdmin, RequireLoggedIn } from 'src/guards/role-container';
import { UserEntity } from '../user/entities/user.entity';
import { AuthUser } from 'src/decorator/auth-user.decorator';
import type { Response } from 'express';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @RequireAdmin()
  async create(@Body() eventCreateDto: EventCreateDto): Promise<EventDto> {
    return EventDto.fromDomain(
      await this.eventService.create(
        EventCreateDto.toEventCreate(eventCreateDto),
      ),
    );
  }

  @Get()
  async findAll(): Promise<EventDto[]> {
    return EventDto.fromDomains(await this.eventService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: Uuid): Promise<EventDto> {
    return EventDto.fromDomain(await this.eventService.findOne(id));
  }

  @Put(':id')
  @RequireAdmin()
  async update(
    @Param('id') id: Uuid,
    @Body() eventUpdateDto: EventUpdateDto,
  ): Promise<EventDto> {
    return EventDto.fromDomain(
      await this.eventService.update(
        id,
        EventUpdateDto.toEventUpdate(eventUpdateDto),
      ),
    );
  }

  @Delete(':id')
  @RequireAdmin()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: Uuid) {
    return this.eventService.remove(id);
  }

  @Get('export/pdf')
  @RequireLoggedIn()
  async exportPdf(@AuthUser() user: UserEntity, @Res() res: Response) {
    const pdfBuffer = await this.eventService.exportEventsPdf(user.id);

     res.setHeader('Content-Type', 'application/pdf');
     res.setHeader('Content-Disposition', 'attachment; filename="events.pdf"');
     res.send(pdfBuffer);
  }
}
