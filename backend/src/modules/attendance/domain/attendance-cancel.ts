import { Uuid } from "src/common/types";
import { UserEntity } from "../../user/entities/user.entity";
import { AttendanceEntity } from "../entities/attendance.entity";

export class AttendanceCancel {
    userId: Uuid;

    eventId: Uuid;

    static toEntity(attendanceCancel: AttendanceCancel): Partial<AttendanceEntity> {
        return {
            userId: attendanceCancel.userId,
            eventId: attendanceCancel.eventId,
        };
    }
}
