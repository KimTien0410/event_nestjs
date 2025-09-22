import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { AttendanceEntity } from './entities/attendance.entity';
import { AttendanceRegister } from './domain/attendace-register';
import { Attendance } from './domain/attendance';
import { AttendanceStatus } from './domain/attendance-status';
import { EventStatus } from '../event/domain/event-status';
import { AttendanceCancel } from './domain/attendance-cancel';
import { UserTopRegistration } from '../user/domain/user-top-registration';
import { UserEntity } from '../user/entities/user.entity';
import { Transactional } from 'typeorm-transactional';
import { EventService } from '../event/event.service';
import { Event } from '../event/domain/event';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceEntity)
    private readonly attendanceRepository: Repository<AttendanceEntity>,
    private readonly eventService: EventService,
  ) {}

  @Transactional()
  async register(attendanceRegister: AttendanceRegister): Promise<Attendance> {
    const existing = await this.attendanceRepository.findOneBy({
      userId: attendanceRegister.userId,
      eventId: attendanceRegister.eventId,
      status: AttendanceStatus.REGISTERED,
    });

    if (existing) {
      throw new BadRequestException(
        'User is already registered for this event',
      );
    }

    const attendanceCancelled = await this.attendanceRepository.findOneBy({
      userId: attendanceRegister.userId,
      eventId: attendanceRegister.eventId,
      status: AttendanceStatus.CANCELLED,
    });

    if (attendanceCancelled) {
      throw new BadRequestException('User has cancelled registration for this event');
    }

    // Check if the event is still open for registration
    const event = await this.eventService.findEventOrThrow(
      attendanceRegister.eventId,
    );

    if (event.status !== EventStatus.UPCOMING) {
      throw new BadRequestException('Event is not open for registration');
    }

    // Check if the event has reached its capacity
    const currentAttendants = await this.eventService.getCurrentAttendantCount(
      attendanceRegister.eventId,
    );

    if (currentAttendants >= event.capacity) {
      throw new BadRequestException('Event has reached its capacity');
    }

    return Attendance.fromEntity(
      await this.attendanceRepository.save({
        userId: attendanceRegister.userId,
        eventId: attendanceRegister.eventId,
        status: AttendanceStatus.REGISTERED,
      }),
    );
  }

  async cancel(attendanceCancel: AttendanceCancel): Promise<void> {
    const attendance = await this.attendanceRepository.findOneBy({
        userId: attendanceCancel.userId,
        eventId: attendanceCancel.eventId,
        status: AttendanceStatus.REGISTERED,
    });

    if (!attendance) {
      throw new BadRequestException('No active registration found for this user and event');
    }
    
    await this.attendanceRepository.save({
      ...attendance,
      status: AttendanceStatus.CANCELLED,
      cancelledAt: new Date(),
    });
  }

  async getTopUsersByAttendance( limit: number = 100 ): Promise<UserTopRegistration[]> {
    const users = await this.attendanceRepository
      .createQueryBuilder('attendance')
      .select('attendance.userId', 'userId')
      .addSelect('user.name', 'userName')
      .addSelect('user.email', 'userEmail')
      .addSelect('COUNT(attendance.id)', 'registrationCount')
      .innerJoin(UserEntity, 'user', 'user.id = attendance.userId')
      .where('attendance.status = :status', {
        status: AttendanceStatus.REGISTERED,
      })
      .groupBy('attendance.userId')
      .addGroupBy('user.name')
      .addGroupBy('user.email')
      .orderBy('COUNT(attendance.id)', 'DESC')
      .limit(limit)
      .getRawMany();

    return users.map(
      (user) =>({
        userId: +user.userId,
        userName: user.userName,
        userEmail: user.userEmail,
        registrationCount: +user.registrationCount
      }),
    );
  }

  async getEventsByUser(userId: number): Promise<Event[]> {
    const attendances = await this.attendanceRepository.find({
      where: {
        userId,
        status: AttendanceStatus.REGISTERED
      },
      relations: {
        event: true,
      }
    });
   
    return Event.fromEntities(
      attendances.map(attendance => attendance.event)
    );
  }

}