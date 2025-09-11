import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../domain/event.domain';

export class EventDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the event',
  })
  id: number;

  @ApiProperty({
    example: 'Annual Tech Conference',
    description: 'Title of the event',
  })
  title: string;

  @ApiProperty({
    example: 'A conference discussing the latest trends in technology.',
    description: 'Description of the event',
  })
  description: string;

  @ApiProperty({
    example: '2023-09-15',
    description: 'Date of the event (YYYY-MM-DD)',
  })
  date: Date;

  @ApiProperty({
    example: '09:00',
    description: 'Start time of the event (HH:MM)',
  })
  time_start: string;

  @ApiProperty({
    example: '17:00',
    description: 'End time of the event (HH:MM)',
  })
  time_end: string;

  @ApiProperty({
    example: 'Convention Center, Hall A',
    description: 'Venue of the event',
  })
  venue: string;

  @ApiProperty({
    example: '123 Main St, Cityville',
    description: 'Location of the event',
  })
  location: string;

  @ApiProperty({
    example: 'upcoming',
    description: 'Status of the event',
  })
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

  @ApiProperty({
    example: 'offline',
    description: 'Type of the event',
  })
  type: 'online' | 'offline' | 'hybrid';

  capacity: number;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Creation date of the event',
  })
  created_at: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Last update date of the event',
  })
  updated_at: Date;

  static fromDomain(event: Event): EventDto {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      time_start: event.time_start,
      time_end: event.time_end,
      venue: event.venue,
      location: event.location,
      status: event.status,
      type: event.type,
      capacity: event.capacity,
      created_at: event.created_at,
      updated_at: event.updated_at,
    };
  }

  static fromDomains(events: Event[]): EventDto[] {
    return events.map((event) => this.fromDomain(event));
  }
}
