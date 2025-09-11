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

export class EventCreateDto {
  @ApiProperty({
    example: 'Tech Conference 2023',
    description: 'Title of the event',
    required: true,
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
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    example: '09:00',
    description: 'Start time of the event (HH:MM)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  time_start: string;

  @ApiProperty({
    example: '17:00',
    description: 'End time of the event (HH:MM)',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  time_end: string;

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
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: 'upcoming',
    description:
      "Status of the event ('upcoming', 'ongoing', 'completed', 'cancelled')",
    required: true,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  })
  @IsEnum(['upcoming', 'ongoing', 'completed', 'cancelled'])
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

  @ApiProperty({
    example: 'offline',
    description: "Type of the event ('online', 'offline', 'hybrid')",
    required: true,
    enum: ['online', 'offline', 'hybrid'],
    default: 'offline',
  })
  @IsEnum(['online', 'offline', 'hybrid'])
  type: 'online' | 'offline' | 'hybrid';

  @ApiProperty({
    example: 100,
    description: 'Capacity of the event (minimum 1)',
    required: true,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  capacity: number;

  static toEventCreate(eventCreateDto: EventCreateDto) {
    return {
      title: eventCreateDto.title,
      description: eventCreateDto.description,
      date: new Date(eventCreateDto.date),
      time_start: eventCreateDto.time_start,
      time_end: eventCreateDto.time_end,
      venue: eventCreateDto.venue,
      location: eventCreateDto.location,
      status: eventCreateDto.status,
      type: eventCreateDto.type,
      capacity: eventCreateDto.capacity,
    };
  }
}
