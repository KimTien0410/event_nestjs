import { EventStatus } from 'src/common/enums/event-status';
import { EventEntity } from '../entities/event.entity';
import { EventType } from 'src/common/enums/event-type';

export class EventCreate {
  readonly title: string;

  readonly description?: string;

  readonly date: Date;

  readonly timeStart: string;

  readonly timeEnd: string;

  readonly venue: string;

  readonly location: string;

  readonly status: EventStatus;

  readonly type: EventType;

  readonly capacity: number;

  static toEntity(eventCreate: EventCreate): Partial<EventEntity> {
    return {
      title: eventCreate.title,
      description: eventCreate.description,
      date: eventCreate.date,
      timeStart: eventCreate.timeStart,
      timeEnd: eventCreate.timeEnd,
      venue: eventCreate.venue,
      location: eventCreate.location,
      status: eventCreate.status,
      type: eventCreate.type,
      capacity: eventCreate.capacity,
    };
  }
}
