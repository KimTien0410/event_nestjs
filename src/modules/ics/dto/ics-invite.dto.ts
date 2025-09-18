import { ApiProperty } from "@nestjs/swagger";
import { IcsInvite } from "../domain/ics-invite";

export class IcsInviteDto {
    @ApiProperty({
        description: "The message content of the invitation",
        example: "You are invited to the event!"
    })
    message: string;

    @ApiProperty({
        description: "The content of the ICS file",
        example: "BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:REQUEST\nBEGIN:VEVENT\nUID:event-1@eventnestjs.com\nSUMMARY:Event Title\nDESCRIPTION:Event Description\nLOCATION:Event Location\nDTSTART;TZID=UTC:20230101T120000Z\nDTEND;TZID=UTC:20230101T130000Z\nEND:VEVENT\nEND:VCALENDAR"
    })
    icsContent?: string;


    static fromDomain(icsInvite: IcsInvite): IcsInviteDto {
        return {
            message: icsInvite.message,
            icsContent: icsInvite.icsContent,
        };
    }
}