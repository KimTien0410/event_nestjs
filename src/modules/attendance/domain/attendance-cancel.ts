import { UserEntity } from "../../user/entities/user.entity";
import { AttendanceEntity } from "../entities/attendance.entity";

export class AttendanceCancel {
    userId: number;

    eventId: number;

    static toEntity(attendanceCancel: AttendanceCancel): Partial<AttendanceEntity> {
        return {
            userId: attendanceCancel.userId,
            eventId: attendanceCancel.eventId,
        };
    }
}
