import { Module } from '@nestjs/common';

import { GoogleCalendarService } from './google-calendar.service';
import { EventModule } from '../event/event.module';
import { AttendanceModule } from '../attendance/attendance.module';
import { GoogleCalendarController } from './google-calendar.controller';

@Module({
  imports: [
    EventModule, 
    AttendanceModule, 
  ],
  controllers: [GoogleCalendarController],
  providers: [GoogleCalendarService],
  exports: [GoogleCalendarService],
})
export class GoogleCalendarModule {}
