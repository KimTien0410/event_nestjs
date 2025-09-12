import { EventStatus } from 'src/common/enums/event-status';
import { EventEntity } from '../entities/event.entity';
import { EventType } from 'src/common/enums/event-type';

export class Event {
  readonly id: number;

  readonly title: string;

  readonly description: string;

  readonly date: Date;

  readonly timeStart: string;

  readonly timeEnd: string;

  readonly venue: string;

  readonly location: string;

  readonly status: EventStatus;

  readonly type: EventType;

  readonly capacity: number;

  readonly createdAt: Date;

  readonly updatedAt: Date;

  static fromEntity(eventEntity: EventEntity): Event {
    return {
      id: eventEntity.id,
      title: eventEntity.title,
      description: eventEntity.description,
      date: eventEntity.date,
      timeStart: eventEntity.timeStart,
      timeEnd: eventEntity.timeEnd,
      venue: eventEntity.venue,
      location: eventEntity.location,
      status: eventEntity.status,
      type: eventEntity.type,
      capacity: eventEntity.capacity,
      createdAt: eventEntity.createdAt,
      updatedAt: eventEntity.updatedAt,
    };
  }

  static fromEntities(eventEntities: EventEntity[]): Event[] {
    return eventEntities.map((eventEntity) => this.fromEntity(eventEntity));
  }
}
