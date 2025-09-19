import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { IcsService } from './ics.service';
import { IcsInviteDto } from './dto/ics-invite.dto';
import { IcsCreateInviteDto } from './dto/ics-create-invite.dto';

@Controller('ics')
export class IcsController {
  constructor(private readonly icsService: IcsService) { }

  @Post()
  async inviteUser(@Body() icsCreateInviteDto: IcsCreateInviteDto): Promise<IcsInviteDto>{
    return IcsInviteDto.fromDomain(
      await this.icsService.sendICSInvite(
        IcsCreateInviteDto.toIcsCreateInvite(icsCreateInviteDto),
      ),
    );
  }
}
