import { Attendance } from "../domain/attendance";
import { AttendanceStatus } from "../domain/attendance-status";

export class AttendanceDto {
  id: number;

  userId: number;

  eventId: number;

  registeredAt: Date;

  status: AttendanceStatus;

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
    return attendances.map((attendance) => this.fromDomain(attendance));
  }
}