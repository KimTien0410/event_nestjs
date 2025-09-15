import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../domain/event';
import { EventStatus } from 'src/modules/event/domain/event-status';
import { EventType } from 'src/modules/event/domain/event-type';

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
    example: '2025-09-15T09:00:00.000Z',
    description: 'YYYY-MM-DDTHH:MM:SSZ (ISO 8601 format) Start time of the event',
  })
  timeStart: Date;

  @ApiProperty({
    example: '2025-09-15T11:00:00.000Z',
    description: 'YYYY-MM-DDTHH:MM:SSZ (ISO 8601 format) End time of the event',
  })
  timeEnd: Date;

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
  status: EventStatus;

  @ApiProperty({
    example: 'offline',
    description: 'Type of the event',
  })
  type: EventType;

  @ApiProperty({
    example: 100,
    description: 'Capacity of the event',
  })
  capacity: number;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Creation date of the event',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'Last update date of the event',
  })
  updatedAt: Date;

  static fromDomain(event: Event): EventDto {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      timeStart: event.timeStart,
      timeEnd: event.timeEnd,
      venue: event.venue,
      location: event.location,
      status: event.status,
      type: event.type,
      capacity: event.capacity,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }

  static fromDomains(events: Event[]): EventDto[] {
    return events.map((event) => this.fromDomain(event));
  }
}
