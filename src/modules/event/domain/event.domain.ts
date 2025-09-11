import { EventEntity } from '../entities/event.entity';

export class Event {
  readonly id: number;

  readonly title: string;

  readonly description: string;

  readonly date: Date;

  readonly time_start: string;

  readonly time_end: string;

  readonly venue: string;

  readonly location: string;

  readonly status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

  readonly type: 'online' | 'offline' | 'hybrid';

  readonly capacity: number;

  readonly created_at: Date;

  readonly updated_at: Date;

  static fromEntity(eventEntity: EventEntity): Event {
    return {
      id: eventEntity.id,
      title: eventEntity.title,
      description: eventEntity.description,
      date: eventEntity.date,
      time_start: eventEntity.time_start,
      time_end: eventEntity.time_end,
      venue: eventEntity.venue,
      location: eventEntity.location,
      status: eventEntity.status as
        | 'upcoming'
        | 'ongoing'
        | 'completed'
        | 'cancelled',
      type: eventEntity.type as 'online' | 'offline' | 'hybrid',
      capacity: eventEntity.capacity,
      created_at: eventEntity.created_at,
      updated_at: eventEntity.updated_at,
    };
  }

  static fromEntities(eventEntities: EventEntity[]): Event[] {
    return eventEntities.map((eventEntity) => this.fromEntity(eventEntity));
  }
}
