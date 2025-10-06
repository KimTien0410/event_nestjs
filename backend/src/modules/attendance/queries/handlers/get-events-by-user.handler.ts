import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetEventsByUserQuery } from '../impl/get-events-by-user.query';
import { AttendanceEntity } from '../../entities/attendance.entity';

@QueryHandler(GetEventsByUserQuery)
export class GetEventsByUserHandler
  implements IQueryHandler<GetEventsByUserQuery>
{
  constructor(
    @InjectRepository(AttendanceEntity)
    private readonly attendanceRepository: Repository<AttendanceEntity>,
  ) {}

  async execute(query: GetEventsByUserQuery) {
    const { userId } = query;
    return await this.attendanceRepository.find({
      where: { userId },
      relations: ['event'],
    });
  }
}
