import { Attendance } from './domain/attendance';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { AttendanceRegister } from './domain/attendace-register';
import { AttendanceService } from './attendance.service';
import { AttendanceDto } from './dto/attendance.dto';
import { AttendanceRegisterDto } from './dto/attendance-register.dto';
import { AttendanceCancelDto } from './dto/attendance-cancel.dto';
import {  UserTopRegistrationDto } from '../user/dto/user-top-registration.dto';

@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async register(@Body() attendanceRegisterDto: AttendanceRegisterDto): Promise<AttendanceDto> {
    return AttendanceDto.fromDomain(
      await this.attendanceService.register(
        AttendanceRegisterDto.toAttendanceRegister(attendanceRegisterDto),
      ),
    );
  }

  @Patch('cancel')
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancel(@Body() attendanceCancelDto: AttendanceCancelDto): Promise<void> {
    return await this.attendanceService.cancel(
      AttendanceCancelDto.toAttendanceCancel(attendanceCancelDto)
    );
  }

  @Get('top-users')
  async getTopUsers(@Query('limit') limit: number): Promise<UserTopRegistrationDto[]> {
    return UserTopRegistrationDto.fromDomains(
      await this.attendanceService.getTopUsersByAttendance(limit)
    );
  }
}
