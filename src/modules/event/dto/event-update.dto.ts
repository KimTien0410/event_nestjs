import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EventCreateDto } from './event-create.dto';
import {
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class EventUpdateDto {
  @ApiProperty({
    example: 'Tech Conference 2023',
    description: 'Title of the event',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'A conference about the latest in technology.',
    description: 'Description of the event (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '2023-09-15',
    description: 'Date of the event (YYYY-MM-DD)',
    required: true,
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    example: '09:00',
    description: 'Start time of the event (HH:MM)',
    required: true,
  })
  @IsString()
  time_start: string;

  @ApiProperty({
    example: '17:00',
    description: 'End time of the event (HH:MM)',
    required: true,
  })
  @IsString()
  time_end: string;

  @ApiProperty({
    example: 'Convention Center, Hall A',
    description: 'Venue of the event (optional)',
    required: true,
  })
  @IsString()
  venue: string;

  @ApiProperty({
    example: '123 Main St, Cityville',
    description: 'Location of the event',
    required: true,
  })
  @IsString()
  location: string;

  @ApiProperty({
    example: 'upcoming',
    description: 'Status of the event',
    required: true,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
  })
  @IsEnum(['upcoming', 'ongoing', 'completed', 'cancelled'])
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

  @ApiProperty({
    example: 'offline',
    description: 'Type of the event',
    required: true,
    enum: ['online', 'offline', 'hybrid'],
  })
  @IsEnum(['online', 'offline', 'hybrid'])
  type: 'online' | 'offline' | 'hybrid';

  @ApiProperty({
    example: 100,
    description: 'Capacity of the event (must be at least 1)',
    required: true,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  capacity: number;

  static toEventUpdate(eventUpdateDto: EventUpdateDto) {
    return {
      title: eventUpdateDto.title,
      description: eventUpdateDto.description,
      date: new Date(eventUpdateDto.date),
      time_start: eventUpdateDto.time_start,
      time_end: eventUpdateDto.time_end,
      venue: eventUpdateDto.venue,
      location: eventUpdateDto.location,
      status: eventUpdateDto.status,
      type: eventUpdateDto.type,
      capacity: eventUpdateDto.capacity,
    };
  }
}
