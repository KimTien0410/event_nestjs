import { UserEntity } from "src/modules/user/entities/user.entity";
import { AttendanceEntity } from "../entities/attendance.entity";
import { EventEntity } from "src/modules/event/entities/event.entity";
import { Uuid } from "src/common/types";

export class AttendanceRegister {
    userId: Uuid;

    eventId: Uuid;

    static toEntity(attendanceRegister: AttendanceRegister): Partial<AttendanceEntity> {
        return {
            userId: attendanceRegister.userId,
            eventId: attendanceRegister.eventId,
        };
    }
}