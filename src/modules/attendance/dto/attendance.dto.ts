import { ApiProperty } from "@nestjs/swagger";
import { Attendance } from "../domain/attendance";
import { AttendanceStatus } from "../domain/attendance-status";

export class AttendanceDto {
  @ApiProperty({ example: 1, description: 'Attendance ID' })
  id: number;

  @ApiProperty({ example: 1, description: 'User ID' })
  userId: number;

  @ApiProperty({ example: 1, description: 'Event ID' })
  eventId: number;

  @ApiProperty({ example: '2023-01-01T00:00:00Z', description: 'Registration Date' })
  registeredAt: Date;

  @ApiProperty({ example: AttendanceStatus.REGISTERED, description: 'Attendance Status' })
  status: AttendanceStatus;

  @ApiProperty({ example: null, description: 'Cancellation Date', nullable: true })
  cancelledAt: Date | null;

  static fromDomain(attendance: Attendance): AttendanceDto {
    return {
      id: attendance.id,
      userId: attendance.userId,
      eventId: attendance.eventId,
      registeredAt: attendance.registeredAt,
      status: attendance.status,
      cancelledAt: attendance.cancelledAt,
    };
  }

  static fromDomains(attendances: Attendance[]): AttendanceDto[] {
    return attendances.map((attendance) => AttendanceDto.fromDomain(attendance));
  }
}