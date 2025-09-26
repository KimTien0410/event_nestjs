import { Uuid } from "src/common/types";
import { UserEntity } from "../../user/entities/user.entity";
import { AttendanceEntity } from "../entities/attendance.entity";

export class AttendanceCancel {
    eventId: Uuid;

    static toEntity(attendanceCancel: AttendanceCancel): Partial<AttendanceEntity> {
        return {
            eventId: attendanceCancel.eventId,
        };
    }
}
