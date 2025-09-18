import { IsNotEmpty, IsNumber } from "class-validator";
import { AttendanceRegister } from "../domain/attendace-register";
import { ApiProperty } from "@nestjs/swagger";

export class AttendanceRegisterDto {
    @ApiProperty({
        example: 1,
        description: 'User ID',
    })
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty({
        example: 1,
        description: 'Event ID',
    })
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
