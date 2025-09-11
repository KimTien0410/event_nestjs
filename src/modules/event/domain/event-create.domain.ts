import { EventEntity } from '../entities/event.entity';

export class EventCreate {
  readonly title: string;

  readonly description?: string;

  readonly date: Date;

  readonly time_start: string;

  readonly time_end: string;

  readonly venue: string;

  readonly location: string;

  readonly status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

  readonly type: 'online' | 'offline' | 'hybrid';

  readonly capacity: number;

  static toEntity(eventCreate: EventCreate): Partial<EventEntity> {
    return {
      title: eventCreate.title,
      description: eventCreate.description,
      date: new Date(eventCreate.date),
      time_start: eventCreate.time_start,
      time_end: eventCreate.time_end,
      venue: eventCreate.venue,
      location: eventCreate.location,
      status: eventCreate.status,
      type: eventCreate.type,
      capacity: eventCreate.capacity,
    };
  }
}
