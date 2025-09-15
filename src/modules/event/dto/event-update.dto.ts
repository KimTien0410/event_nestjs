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
import { EventStatus } from 'src/modules/event/domain/event-status';
import { EventType } from 'src/modules/event/domain/event-type';
import { Type } from 'class-transformer';

export class EventUpdateDto {
  @ApiProperty({
    example: 'Tech Conference 2023',
    description: 'Title of the event',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'A conference about the latest in technology.',
    description: 'Description of the event (optional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '2025-09-15T07:00:00.000Z',
    description: 'YYYY-MM-DDTHH:MM:SSZ (ISO 8601 format) Start time of the event',
  })
  @IsDate()
  @Type(() => Date)
  timeStart: Date;

  @ApiProperty({
    example: '2025-09-15T09:00:00.000Z',
    description: 'YYYY-MM-DDTHH:MM:SSZ (ISO 8601 format) End time of the event',
  })
  @IsDate()
  @Type(() => Date)
  timeEnd: Date;

  @ApiProperty({
    example: 'Convention Center, Hall A',
    description: 'Venue of the event (optional)',
  })
  @IsString()
  @IsOptional()
  venue?: string;

  @ApiProperty({
    example: '123 Main St, Cityville',
    description: 'Location of the event',
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({
    example: 'upcoming',
    description: 'Status of the event',
    enum: EventStatus,
    default: EventStatus.UPCOMING,
  })
  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus;

  @ApiProperty({
    example: 'offline',
    description: 'Type of the event',
    enum: EventType,
    default: EventType.OFFLINE,
  })
  @IsEnum(EventType)
  @IsOptional()
  type?: EventType;

  @ApiProperty({
    example: 100,
    description: 'Capacity of the event (must be at least 1)',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  capacity?: number;

  static toEventUpdate(eventUpdateDto: EventUpdateDto) {
    return {
      title: eventUpdateDto.title,
      description: eventUpdateDto.description,
      timeStart: eventUpdateDto.timeStart,
      timeEnd: eventUpdateDto.timeEnd,
      venue: eventUpdateDto.venue,
      location: eventUpdateDto.location,
      status: eventUpdateDto.status,
      type: eventUpdateDto.type,
      capacity: eventUpdateDto.capacity,
    };
  }
}
