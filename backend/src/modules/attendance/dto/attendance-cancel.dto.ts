import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AttendanceCancel } from "../domain/attendance-cancel";
import { ApiProperty } from "@nestjs/swagger";
import type { Uuid } from "src/common/types";

export class AttendanceCancelDto {
    @ApiProperty({
        example: 1,
        description: 'User ID',
    })
    @IsNotEmpty()
    @IsString()
    userId: Uuid;

    @ApiProperty({
        example: 1,
        description: 'Event ID',
    })
    @IsNotEmpty()
    @IsString()
    eventId: Uuid;

    static toAttendanceCancel(attendanceCancelDto: AttendanceCancelDto): AttendanceCancel {
        return {
            userId: attendanceCancelDto.userId,
            eventId: attendanceCancelDto.eventId,
        };
    }
}