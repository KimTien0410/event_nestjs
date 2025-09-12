import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventCreateDto } from './dto/event-create.dto';
import { EventUpdateDto } from './dto/event-update.dto';
import { EventDto } from './dto/event.dto';
import { UserDto } from '../user/dto/user.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() eventCreateDto: EventCreateDto): Promise<EventDto> {
    return EventDto.fromDomain(
      await this.eventService.create(
        EventCreateDto.toEventCreate(eventCreateDto),
      ),
    );
  }

  @Get()
  async findAll(): Promise<EventDto[]> {
    return EventDto.fromDomains(
      await this.eventService.findAll()
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<EventDto> {
    return EventDto.fromDomain(
      await this.eventService.findOne(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() eventUpdateDto: EventUpdateDto,
  ) {
    return EventDto.fromDomain(
      await this.eventService.update(
        id,
        EventUpdateDto.toEventUpdate(eventUpdateDto),
      ),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    return this.eventService.remove(id);
  }
}
