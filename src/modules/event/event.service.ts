import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventCreateDto } from './dto/event-create.dto';
import { EventUpdateDto } from './dto/event-update.dto';
import { EventCreate } from './domain/event-create.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { EventEntity } from './entities/event.entity';
import { Repository } from 'typeorm';
import { Event } from './domain/event.domain';
import { EventUpdate } from './domain/event-update.domain';
@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async create(eventCreate: EventCreate): Promise<Event> {
    this.validateEventDateAndTime(
      eventCreate.date,
      eventCreate.time_start,
      eventCreate.time_end,
    );

    const eventEntity = await this.eventRepository.save(
      this.eventRepository.create(EventCreate.toEntity(eventCreate)),
    );

    return Event.fromEntity(eventEntity);
  }

  async findAll(): Promise<Event[]> {
    return Event.fromEntities(await this.eventRepository.find());
  }

  async findOne(id: number): Promise<Event> {
    return Event.fromEntity(await this.findEventOrThrow(id));
  }

  async update(id: number, updateEvent: EventUpdate): Promise<Event> {
    const eventEntity = this.findEventOrThrow(id);
    this.validateEventDateAndTime(
      updateEvent.date,
      updateEvent.time_start,
      updateEvent.time_end,
    );

    return Event.fromEntity(
      await this.eventRepository.save({
        ...eventEntity,
        ...EventUpdate.toEntity(updateEvent),
      }),
    );
  }

  async remove(id: number): Promise<void> {
    await this.eventRepository.remove(await this.findEventOrThrow(id));
  }

  private async findEventOrThrow(id: number): Promise<EventEntity> {
    const eventEntity = await this.eventRepository.findOneBy({ id });

    if (!eventEntity) {
      throw new NotFoundException(`Event with Id ${id} not found`);
    }

    return eventEntity;
  }

  private validateEventDateAndTime(
    date: Date,
    time_start: string,
    time_end: string,
  ) {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 7);

    const eventDate = new Date(date);

    const currentDateOnly = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const eventDateOnly = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate(),
    );
    if (eventDateOnly < currentDateOnly) {
      throw new BadRequestException(
        'Event date must be today or in the future',
      );
    }

    if (
      eventDateOnly.getTime() === currentDate.getTime() ||
      eventDateOnly.getTime() > currentDateOnly.getTime()
    ) {
      const [startHours, startMinutes, startSeconds] = time_start
        .split(':')
        .map(Number);
      const [endHours, endMinutes, endSeconds] = time_end
        .split(':')
        .map(Number);

      const startTimeInSeconds =
        startHours * 3600 + startMinutes * 60 + (startSeconds || 0);
      const endTimeInSeconds =
        endHours * 3600 + endMinutes * 60 + (endSeconds || 0);

      if (startTimeInSeconds > endTimeInSeconds) {
        throw new BadRequestException(
          'Event start time must be before end time',
        );
      }
    }
  }
}
