import { EventStatus } from 'src/modules/event/domain/event-status';
import { EventEntity } from '../entities/event.entity';
import { EventType } from 'src/modules/event/domain/event-type';

export class EventCreate {
  readonly title: string;

  readonly googleEventId?: string;

  readonly description?: string;

  readonly timeStart: Date;

  readonly timeEnd: Date;

  readonly venue?: string;

  readonly location: string;

  readonly status: EventStatus;

  readonly type: EventType;

  readonly capacity: number;

  static toEntity(eventCreate: EventCreate): Partial<EventEntity> {
    return {
      title: eventCreate.title,
      googleEventId: eventCreate.googleEventId,
      description: eventCreate.description,
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
