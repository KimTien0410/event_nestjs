import { UserEntity } from "src/modules/user/entities/user.entity";
import { AttendanceEntity } from "../entities/attendance.entity";
import { EventEntity } from "src/modules/event/entities/event.entity";

export class AttendanceRegister {
    userId: number;
    
    eventId: number;

    static toEntity(attendanceRegister: AttendanceRegister): Partial<AttendanceEntity> {
        return {
            userId: attendanceRegister.userId,
            eventId: attendanceRegister.eventId,
        };
    }
}