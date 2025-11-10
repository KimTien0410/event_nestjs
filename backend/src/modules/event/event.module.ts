import {Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { AttendanceModule } from '../attendance/attendance.module';
import { CqrsModule } from '@nestjs/cqrs';
import { GetCurrentAttendantCountHandler } from './queries/handlers/get-current-attendance-count.handler';
import { FindEventOrThrowHandler } from './queries/handlers/find-event-or-throw.handler';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([EventEntity])],
  controllers: [EventController],
  providers: [
    EventService,
    GetCurrentAttendantCountHandler,
    FindEventOrThrowHandler,
  ],
  exports: [EventService],
})
export class EventModule {}
