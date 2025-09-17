import { AttendanceEntity } from "../entities/attendance.entity";
import { AttendanceStatus } from "./attendance-status";

export class Attendance {
    id: number;

    eventId: number;

    userId: number;

    registeredAt: Date;

    status: AttendanceStatus;

    cancelledAt: Date | null;

    static fromEntity(attendanceEntity: AttendanceEntity): Attendance {
        return {
            id: attendanceEntity.id,
            eventId: attendanceEntity.eventId,
            userId: attendanceEntity.userId,
            registeredAt: attendanceEntity.registeredAt,
            status: attendanceEntity.status,
            cancelledAt: attendanceEntity.cancelledAt ?? null,
        };
    }

    static fromEntities(attendanceEntities: AttendanceEntity[]): Attendance[] {
        return attendanceEntities.map((attendanceEntity) =>
            Attendance.fromEntity(attendanceEntity)
        );
    }
}