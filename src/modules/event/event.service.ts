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
    EventService.validateEventTime(eventCreate.timeStart, eventCreate.timeEnd);

    return Event.fromEntity(
      await this.eventRepository.save(
        this.eventRepository.create(EventCreate.toEntity(eventCreate)),
      ),
    );
  }

  async findAll(): Promise<Event[]> {
    return Event.fromEntities(await this.eventRepository.find());
  }

  async findOne(id: number): Promise<Event> {
    return Event.fromEntity(await this.findEventOrThrow(id));
  }

  async update(id: number, updateEvent: EventUpdate): Promise<Event> {
    const eventEntity = await this.findEventOrThrow(id);
    EventService.validateEventTime(
      updateEvent.timeStart ?? eventEntity.timeStart,
      updateEvent.timeEnd ?? eventEntity.timeEnd
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

  async findEventOrThrow(id: number): Promise<EventEntity> {
    const eventEntity = await this.eventRepository.findOneBy({ id });

    if (!eventEntity) {
      throw new NotFoundException(`Event with Id ${id} not found`);
    }

    return eventEntity;
  }

  private static validateEventTime(timeStart: Date, timeEnd: Date) {
    const now = new Date();

    if (timeStart <= now) {
      throw new BadRequestException('Start time must be in the future');
    }

    if (timeEnd <= now) {
        throw new BadRequestException('End time must be in the future');
    }

    if (timeEnd <= timeStart) {
        throw new BadRequestException('End time must be after start time');
      }
  }
}
