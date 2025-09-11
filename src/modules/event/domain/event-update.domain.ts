import { EventEntity } from '../entities/event.entity';

export class EventUpdate {
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

  static toEntity(eventUpdate: EventUpdate): Partial<EventEntity> {
    return {
      title: eventUpdate.title,
      description: eventUpdate.description,
      date: eventUpdate.date,
      time_start: eventUpdate.time_start,
      time_end: eventUpdate.time_end,
      venue: eventUpdate.venue,
      location: eventUpdate.location,
      status: eventUpdate.status,
      type: eventUpdate.type,
      capacity: eventUpdate.capacity,
    };
  }
}
