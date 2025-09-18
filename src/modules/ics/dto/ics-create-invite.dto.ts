import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";
import { IcsCreateInvite } from "../domain/ics-create-invite";

export class IcsCreateInviteDto {
    @ApiProperty({
        description: "The ID of the event to which the user is being invited",
        example: 1
    })
    @IsNumber()
    eventId: number;

    @ApiProperty({
        description: "The ID of the user who is sending the invitation",
        example: 1
    })
    @IsNumber()
    userId: number;

    @ApiProperty({
        description: "The email address of the attendee being invited",
        example: "attendee@example.com"
    })
    @IsOptional()
    @IsEmail()
    attendeeEmail?: string | null;

    @ApiProperty({
        description: "The description or message included with the invitation",
        example: "You are invited to the event!"
    })
    @IsOptional()
    @IsString()
    description?: string | null;

    static toIcsCreateInvite(icsCreateInviteDto: IcsCreateInviteDto): IcsCreateInvite {
        return {
          eventId: icsCreateInviteDto.eventId,
          userId: icsCreateInviteDto.userId,
          attendanceEmail: icsCreateInviteDto.attendeeEmail,
          description: icsCreateInviteDto.description,
        };
    }
}
