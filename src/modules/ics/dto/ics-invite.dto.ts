import { ApiProperty } from "@nestjs/swagger";
import { IcsInvite } from "../domain/ics-invite";

export class IcsInviteDto {
    @ApiProperty({
        description: "The ICS content of the invitation",
        example: "https://example.com/event.ics"
    })
    linkUrl: string;

    static fromDomain(icsInvite: IcsInvite): IcsInviteDto {
        return {
            linkUrl: icsInvite.linkUrl,
        };
    }
}