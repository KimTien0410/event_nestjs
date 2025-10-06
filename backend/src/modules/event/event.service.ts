import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventCreate } from './domain/event-create';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { Repository } from 'typeorm';
import { Event } from './domain/event';
import { EventUpdate } from './domain/event-update';
import { AttendanceStatus } from '../attendance/domain/attendance-status';
import { Uuid } from 'src/common/types';
import { createPdfFromEvents } from 'src/utils/pdf.utils';
import { QueryBus } from '@nestjs/cqrs';
import { GetEventsByUserQuery } from '../attendance/queries/impl/get-events-by-user.query';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    private readonly queryBus: QueryBus,
  ) {}

  async create(eventCreate: EventCreate): Promise<Event> {
    EventService.validateEventTime(eventCreate.timeStart, eventCreate.timeEnd);

    return Event.fromEntity(await this.createEventEntity(eventCreate));
  }

  async createEventEntity(eventCreate: EventCreate): Promise<EventEntity> {
    return await this.eventRepository.save(
      this.eventRepository.create(EventCreate.toEntity(eventCreate)),
    );
  }

  async findAll(): Promise<Event[]> {
    return Event.fromEntities(await this.eventRepository.find());
  }

  async findOne(id: Uuid): Promise<Event> {
    return Event.fromEntity(await this.findEventOrThrow(id));
  }

  async update(id: Uuid, updateEvent: EventUpdate): Promise<Event> {
    const eventEntity = await this.findEventOrThrow(id);
    EventService.validateEventTime(
      updateEvent.timeStart ?? eventEntity.timeStart,
      updateEvent.timeEnd ?? eventEntity.timeEnd,
    );

    return Event.fromEntity(
      await this.eventRepository.save({
        ...eventEntity,
        ...EventUpdate.toEntity(updateEvent),
      }),
    );
  }

  async remove(id: Uuid): Promise<void> {
    await this.eventRepository.remove(await this.findEventOrThrow(id));
  }

  async findEventOrThrow(id: Uuid): Promise<EventEntity> {
    const eventEntity = await this.eventRepository.findOneBy({ id });

    if (!eventEntity) {
      throw new NotFoundException(`Event with Id ${id} not found`);
    }

    return eventEntity;
  }

  async findByGoogleEventId(
    googleEventId: string,
  ): Promise<EventEntity | null> {
    return await this.eventRepository.findOneBy({ googleEventId });
  }

  async exportEventsPdf(userId: Uuid): Promise<Buffer> {
    const attendances = await this.queryBus.execute(
      new GetEventsByUserQuery(userId),
    );

    if (!attendances || attendances.length === 0) {
      throw new Error('No events found for this user');
    }

    const events = attendances.map((a) => a.event).filter((e) => !!e);

    const uniqueEvents = events.filter(
      (event, index, self) =>
        index === self.findIndex((e) => e.id === event.id),
    );

    return await createPdfFromEvents(uniqueEvents);
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

  async getCurrentAttendantCount(eventId: Uuid): Promise<number> {
    return this.eventRepository.countBy({
      id: eventId,
      attendances: { status: AttendanceStatus.REGISTERED },
    });
  }
}
