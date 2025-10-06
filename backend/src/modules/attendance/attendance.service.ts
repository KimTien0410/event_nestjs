import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { AttendanceEntity } from './entities/attendance.entity';
import { AttendanceRegister } from './domain/attendace-register';
import { Attendance } from './domain/attendance';
import { AttendanceStatus } from './domain/attendance-status';
import { EventStatus } from '../event/domain/event-status';
import { AttendanceCancel } from './domain/attendance-cancel';
import { UserTopRegistration } from '../user/domain/user-top-registration';
import { Transactional } from 'typeorm-transactional';
import { Event } from '../event/domain/event';
import type { Uuid } from 'src/common/types';
import { EventEntity } from '../event/entities/event.entity';
import { QueryBus } from '@nestjs/cqrs';
import { FindEventOrThrowQuery } from '../event/queries/impl/find-event-or-throw.query';
import { GetCurrentAttendantCountQuery } from '../event/queries/impl/get-current-attendance-count.query';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceEntity)
    private readonly attendanceRepository: Repository<AttendanceEntity>,
    private readonly queryBus: QueryBus
  ) {}

  @Transactional()
  async register(
    userId: Uuid,
    attendanceRegister: AttendanceRegister,
  ): Promise<Attendance> {
    const eventId = attendanceRegister.eventId;
    const existing = await this.attendanceRepository.findOneBy({
      userId: userId,
      eventId: eventId,
      status: AttendanceStatus.REGISTERED,
    });

    if (existing) {
      throw new BadRequestException(
        'User is already registered for this event',
      );
    }

    const attendanceCancelled = await this.attendanceRepository.findOneBy({
      userId: userId,
      eventId: eventId,
      status: AttendanceStatus.CANCELLED,
    });

    if (attendanceCancelled) {
      throw new BadRequestException(
        'User has cancelled registration for this event',
      );
    }

    // Check if the event is still open for registration
    const event = await this.queryBus.execute(new FindEventOrThrowQuery(eventId));

    if (event.status !== EventStatus.UPCOMING) {
      throw new BadRequestException('Event is not open for registration');
    }

    // Check if the event has reached its capacity
    const currentAttendants = await this.queryBus.execute(new GetCurrentAttendantCountQuery(eventId));

    if (currentAttendants >= event.capacity) {
      throw new BadRequestException('Event has reached its capacity');
    }

    return Attendance.fromEntity(
      await this.attendanceRepository.save({
        userId: userId,
        eventId: attendanceRegister.eventId,
        status: AttendanceStatus.REGISTERED,
      }),
    );
  }

  async cancel(
    userId: Uuid,
    attendanceCancel: AttendanceCancel,
  ): Promise<void> {
    const event = await this.queryBus.execute(new FindEventOrThrowQuery(
      attendanceCancel.eventId,
    ));
    const attendance = await this.findByUserAndEventOrThrow(
      userId,
      attendanceCancel.eventId,
    );

    if (attendance.status === AttendanceStatus.CANCELLED) {
      throw new ConflictException('Attendance is already cancelled');
    }

    if (attendance.status !== AttendanceStatus.REGISTERED) {
      throw new BadRequestException(
        `Attendance cannot be cancelled because status = ${attendance.status}`,
      );
    }

    await this.attendanceRepository.save({
      ...attendance,
      status: AttendanceStatus.CANCELLED,
      cancelledAt: new Date(),
    });
  }

  async getTopUsersByAttendance(
    limit: number = 100,
  ): Promise<UserTopRegistration[]> {
    return this.attendanceRepository
      .createQueryBuilder('attendance')
      .innerJoin('attendance.user', 'u')
      .select('attendance.userId', 'userId')
      .addSelect('u.email', 'userEmail')
      .addSelect('u.firstName', 'userFirstName')
      .addSelect('u.lastName', 'userLastName')
      .addSelect('COUNT(attendance.id)', 'registrationCount')
      .where('attendance.status = :status', { status: 'registered' })
      .groupBy('attendance.userId')
      .addGroupBy('u.firstName')
      .addGroupBy('u.lastName')
      .addGroupBy('u.email')
      .orderBy('COUNT(attendance.id)', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  async getEventsByUser(userId: Uuid): Promise<Event[]> {
    const attendances = await this.attendanceRepository.find({
      where: {
        userId,
        status: AttendanceStatus.REGISTERED,
      },
      relations: {
        event: true,
      },
    });

    return Event.fromEntities(
      attendances.map((attendance) => attendance.event),
    );
  }

  async findByUserAndEventOrThrow(
    userId: Uuid,
    eventId: Uuid,
  ): Promise<AttendanceEntity> {
    const attendance = await this.findByUserAndEvent(userId, eventId);

    if (!attendance) {
      throw new NotFoundException('Attendance not found');
    }

    return attendance;
  }

  async findByUserAndEvent(
    userId: Uuid,
    eventId: Uuid,
  ): Promise<AttendanceEntity | null> {
    return await this.attendanceRepository.findOneBy({
      userId,
      eventId,
    });
  }

  async findByUserId(userId: Uuid): Promise<EventEntity[]> {
    const attendances = await this.attendanceRepository.find({
      where: { userId },
      relations: {
        event: true,
      },
    });

    return attendances.map((attendance) => attendance.event);
  }
}
