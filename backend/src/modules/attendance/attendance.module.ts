import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceEntity } from './entities/attendance.entity';
import { UserModule } from '../user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { GetEventsByUserHandler } from './queries/handlers/get-events-by-user.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([AttendanceEntity]),
    UserModule,
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService, GetEventsByUserHandler],
  exports: [AttendanceService],
})
export class AttendanceModule {}
