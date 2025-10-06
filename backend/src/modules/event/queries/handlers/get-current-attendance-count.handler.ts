import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCurrentAttendantCountQuery } from '../impl/get-current-attendance-count.query';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '../../entities/event.entity';
import { Repository } from 'typeorm';
import { AttendanceStatus } from 'src/modules/attendance/domain/attendance-status';

@QueryHandler(GetCurrentAttendantCountQuery)
export class GetCurrentAttendantCountHandler
  implements IQueryHandler<GetCurrentAttendantCountQuery>
{
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async execute(query: GetCurrentAttendantCountQuery): Promise<number> {
    const { eventId } = query;
    return this.eventRepository.countBy({
      id: eventId,
      attendances: { status: AttendanceStatus.REGISTERED },
    });
  }
}
