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
import { EventStatus } from 'src/common/enums/event-status';
import { EventType } from 'src/common/enums/event-type';

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
  description: string;

  @ApiProperty({
    example: '2023-09-15',
    description: 'Date of the event (YYYY-MM-DD)',
  })
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({
    example: '09:00',
    description: 'Start time of the event (HH:MM)',
  })
  @IsNotEmpty()
  @IsString()
  timeStart: string;

  @ApiProperty({
    example: '17:00',
    description: 'End time of the event (HH:MM)',
  })
  @IsString()
  @IsNotEmpty()
  timeEnd: string;

  @ApiPropertyOptional({
    example: 'Convention Center, Hall A',
    description: 'Venue of the event (optional)',
    required: false,
  })
  @IsString()
  @IsOptional()
  venue: string;

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

  static toEventCreate(eventCreateDto: EventCreateDto) {
    return {
      title: eventCreateDto.title,
      description: eventCreateDto.description,
      date: eventCreateDto.date,
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
