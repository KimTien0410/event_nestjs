import { EventEntity } from '../entities/event.entity';
import { EventStatus } from './event-status';
import { EventType } from './event-type';

export class EventUpdate {
  readonly title: string;

  readonly description?: string;

  readonly timeStart: Date;

  readonly timeEnd: Date;

  readonly venue: string;

  readonly location: string;

  readonly status: EventStatus;

  readonly type: EventType;

  readonly capacity: number;

  static toEntity(eventUpdate: EventUpdate): Partial<EventEntity> {
    return {
      title: eventUpdate.title,
      description: eventUpdate.description,
      timeStart: eventUpdate.timeStart,
      timeEnd: eventUpdate.timeEnd,
      venue: eventUpdate.venue,
      location: eventUpdate.location,
      status: eventUpdate.status,
      type: eventUpdate.type,
      capacity: eventUpdate.capacity,
    };
  }
}
