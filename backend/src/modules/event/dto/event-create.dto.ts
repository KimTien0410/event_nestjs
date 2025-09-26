import {
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventStatus } from 'src/modules/event/domain/event-status';
import { EventType } from 'src/modules/event/domain/event-type';
import { Type } from 'class-transformer';
import { EventCreate } from '../domain/event-create';

export class EventCreateDto {
  @ApiProperty({
    example: 'Tech Conference 2023',
    description: 'Title of the event',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: 'A conference about the latest in technology.',
    description: 'Description of the event (optional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '2025-09-15T09:00:00.000Z',
    description: 'YYYY-MM-DDTHH:MM:SSZ (ISO 8601 format) Start time of the event',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  timeStart: Date;

  @ApiProperty({
    example: '2025-09-15T09:00:00.000Z',
    description: 'YYYY-MM-DDTHH:MM:SSZ (ISO 8601 format) End time of the event ',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  timeEnd: Date;

  @ApiPropertyOptional({
    example: 'Convention Center, Hall A',
    description: 'Venue of the event (optional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  venue?: string;

  @ApiProperty({
    example: '123 Main St, Cityville',
    description: 'Location of the event',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: 'upcoming',
    description:
      "Status of the event ('upcoming', 'ongoing', 'completed', 'cancelled')",
    enum: EventStatus,
    default: EventStatus.UPCOMING,
  })
  @IsEnum(EventStatus)
  status: EventStatus;

  @ApiProperty({
    example: 'offline',
    description: "Type of the event ('online', 'offline', 'hybrid')",
    enum: EventType,
    default: EventType.OFFLINE,
  })
  @IsEnum(EventType)
  type: EventType;

  @ApiProperty({
    example: 100,
    description: 'Capacity of the event (minimum 1)',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  capacity: number;

  static toEventCreate(eventCreateDto: EventCreateDto): EventCreate {
    return {
      title: eventCreateDto.title,
      description: eventCreateDto.description,
      timeStart: eventCreateDto.timeStart,
      timeEnd: eventCreateDto.timeEnd,
      venue: eventCreateDto.venue,
      location: eventCreateDto.location,
      status: eventCreateDto.status,
      type: eventCreateDto.type,
      capacity: eventCreateDto.capacity,
    };
  }
}
