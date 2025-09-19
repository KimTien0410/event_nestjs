import { ApiProperty } from "@nestjs/swagger";
import { IcsInvite } from "../domain/ics-invite";

export class IcsInviteDto {
    @ApiProperty({
        description: "The message content of the invitation",
        example: "You are invited to the event!"
    })
    message: string;

    @ApiProperty({
        description: "The ICS content of the invitation",
        example: "https://example.com/event.ics"
    })
    linkUrl: string;

    static fromDomain(icsInvite: IcsInvite): IcsInviteDto {
        return {
            message: icsInvite.message,
            linkUrl: icsInvite.linkUrl,
        };
    }
}