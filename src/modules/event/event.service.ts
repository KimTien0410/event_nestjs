import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventCreateDto } from './dto/event-create.dto';
import { EventUpdateDto } from './dto/event-update.dto';
import { EventCreate } from './domain/event-create';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { EventEntity } from './entities/event.entity';
import { Repository } from 'typeorm';
import { Event } from './domain/event';
import { EventUpdate } from './domain/event-update';
@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async create(eventCreate: EventCreate): Promise<Event> {
    this.validateEventDateAndTime(
      eventCreate.date,
      eventCreate.timeStart,
      eventCreate.timeEnd,
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
      updateEvent.timeStart,
      updateEvent.timeEnd,
    );

    const toUpdate = await this.eventRepository.preload({
      id,
      ...EventUpdate.toEntity(updateEvent),
    });

    if (!toUpdate) {
      throw new NotFoundException(`Event ${id} not found`);
    }

    return Event.fromEntity(await this.eventRepository.save(toUpdate));
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

  private validateEventDateAndTime(date: Date, timeStart: Date, timeEnd: Date) {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 7); 

    const currentDateOnly = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const eventDateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    if (eventDateOnly < currentDateOnly) {
      throw new BadRequestException(
        'Event date must be today or in the future',
      );
    }

    if (eventDateOnly >= currentDateOnly) {
      if (timeStart >= timeEnd) {
        throw new BadRequestException(
          'Event start time must be before end time',
        );
      }
    }
  }
}
