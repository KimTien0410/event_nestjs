import { IsNotEmpty, IsNumber } from "class-validator";
import { AttendanceCancel } from "../domain/attendance-cancel";
import { ApiProperty } from "@nestjs/swagger";

export class AttendanceCancelDto {
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
    
    static toAttendanceCancel(attendanceCancelDto: AttendanceCancelDto): AttendanceCancel {
        return {
            userId: attendanceCancelDto.userId,
            eventId: attendanceCancelDto.eventId,
        };
    }
}