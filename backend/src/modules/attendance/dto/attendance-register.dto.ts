import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AttendanceRegister } from "../domain/attendace-register";
import { ApiProperty } from "@nestjs/swagger";
import type { Uuid } from "src/common/types";

export class AttendanceRegisterDto {
    @ApiProperty({
        example: 1,
        description: 'Event ID',
    })
    @IsNotEmpty()
    @IsString()
    eventId: Uuid;

    static toAttendanceRegister(attendanceRegister: AttendanceRegisterDto): AttendanceRegister {
        return {
            eventId: attendanceRegister.eventId,
        };
    }

    
}
