import { IsNotEmpty, IsNumber } from "class-validator";
import { AttendanceCancel } from "../domain/attendance-cancel";

export class AttendanceCancelDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    static toAttendanceCancel(attendanceCancelDto: AttendanceCancelDto): AttendanceCancel {
        return {
            userId: attendanceCancelDto.userId,
        };
    }
}