import { IsNotEmpty, IsNumber } from "class-validator";
import { AttendanceRegister } from "../domain/attendace-register";

export class AttendanceRegisterDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    eventId: number;

    static toAttendanceRegister(attendanceRegister: AttendanceRegisterDto): AttendanceRegister {
        return {
            userId: attendanceRegister.userId,
            eventId: attendanceRegister.eventId,
        };
    }

    
}
