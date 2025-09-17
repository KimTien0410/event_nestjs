import { UserEntity } from "../../user/entities/user.entity";
import { AttendanceEntity } from "../entities/attendance.entity";

export class AttendanceCancel {
    userId: number;

    static toEntity(attendanceCancel: AttendanceCancel): Partial<AttendanceEntity> {
        return {
            userEntity: { id: attendanceCancel.userId } as UserEntity,
        };
    }
}
