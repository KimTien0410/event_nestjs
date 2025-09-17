import { UserEntity } from "../../user/entities/user.entity";
import { AttendanceEntity } from "../entities/attendance.entity";

export class AttendanceCancel {
    id: number;

    userId: number;

    eventId: number;

    static toEntity(attendanceCancel: AttendanceCancel): Partial<AttendanceEntity> {
        return {
            id: attendanceCancel.id,
            userId: attendanceCancel.userId,
            eventId: attendanceCancel.eventId,
        };
    }
}
