import { EventEntity } from '../entities/event.entity';
import { EventStatus } from '../../../common/enums/event-status';
import { EventType } from '../../../common/enums/event-type';

export class EventUpdate {
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

  static toEntity(eventUpdate: EventUpdate): Partial<EventEntity> {
    return {
      title: eventUpdate.title,
      description: eventUpdate.description,
      date: eventUpdate.date,
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
