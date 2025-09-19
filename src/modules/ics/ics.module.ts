import { Module } from '@nestjs/common';
import { IcsService } from './ics.service';
import { IcsController } from './ics.controller';
import { EventModule } from '../event/event.module';
import { AttendanceModule } from '../attendance/attendance.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  controllers: [IcsController],
  providers: [IcsService],
  imports: [
    CloudinaryModule,
    EventModule,
    AttendanceModule,
  ],
  exports: [IcsService],
})
export class IcsModule {}
