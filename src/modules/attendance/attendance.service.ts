import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { AttendanceEntity } from './entities/attendance.entity';
import type { IEventRegistrationService } from '../event/i-event-registration.service';
import { AttendanceRegister } from './domain/attendace-register';
import { Attendance } from './domain/attendance';
import { AttendanceStatus } from './domain/attendance-status';
import { EventService } from '../event/event.service';
import { UserService } from '../user/user.service';
import { EventStatus } from '../event/domain/event-status';
import { AttendanceCancel } from './domain/attendance-cancel';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceEntity)
    private attendanceRepository: Repository<AttendanceEntity>,

    @InjectDataSource()
    private dataSource: DataSource,

    @Inject('IEventRegistrationService')
    private eventRegistrationService: IEventRegistrationService,

    private readonly eventService: EventService,

    private readonly userService: UserService,

  ) {}

  async register(attendanceRegister: AttendanceRegister): Promise<Attendance> {
    const user = await this.userService.findUserOrThrow(attendanceRegister.userId);
    const event = await this.eventService.findEventOrThrow(attendanceRegister.eventId);
    return this.dataSource
      .transaction(async (manager: EntityManager) => {
        // Kiểm tra xem sự kiện có thể đăng ký được không
        const isRegistrable = await this.eventRegistrationService.isEventRegistrable(
          attendanceRegister.eventId,
          manager,
        );

        if (!isRegistrable) {
          throw new BadRequestException('Event is not open for registration');
        }

        // Lấy thông tin sự kiện
        const event = await this.eventRegistrationService.getEventForRegistration(
          attendanceRegister.eventId,
          manager,
        );

        // Kiểm tra capacity
        const currentAttendants =
          await this.eventRegistrationService.getCurrentAttendantCount(
            attendanceRegister.eventId,
            manager,
          );
        
        if (currentAttendants >= event.capacity) {
          throw new BadRequestException('Event has reached its capacity');
        }

        // Kiểm tra conflict thời gian
        const conflicting = await manager
          .createQueryBuilder(AttendanceEntity, 'attendance')
          .innerJoin('attendance.eventEntity', 'eventEntity')
          .where('attendance.userEntity.id = :userId', {
            userId: attendanceRegister.userId,
          })
          .andWhere('attendance.status = :status', { status: AttendanceStatus.REGISTERED })
          .andWhere(
            '(eventEntity.timeStart < :newEnd AND eventEntity.timeEnd > :newStart)',
            {
              newStart: event.timeStart,
              newEnd: event.timeEnd,
            },
          )
          .getCount();

        if (conflicting > 0) {
          throw new BadRequestException('User has a conflicting event');
        }

        // Kiểm tra xem user đã đăng ký sự kiện này chưa
        const existingRegistration = await manager.findOne(AttendanceEntity, {
          where: {
            userEntity: { id: attendanceRegister.userId },
            eventEntity: { id: attendanceRegister.eventId },
            status: AttendanceStatus.REGISTERED,
          },
        });
        if (existingRegistration) {
          throw new BadRequestException(
            'User is already registered for this event',
          );
        }

        // Tạo và lưu bản ghi attendance
        const attendance = manager.create(AttendanceEntity, {
          userEntity: { id: attendanceRegister.userId },
          eventEntity: { id: attendanceRegister.eventId },
          status: AttendanceStatus.REGISTERED,
        });

        return Attendance.fromEntity(await manager.save(AttendanceEntity, attendance));

      })
      .catch((error) => {
        // Xử lý lỗi unique constraint hoặc các lỗi khác
        if (error.code === '23505') {
          throw new BadRequestException(
            'User is already registered for this event',
          );
        }
        throw new BadRequestException(`Registration failed: ${error.message}`);
      });
  }

  async cancel(attendanceId: number, attendanceCancel: AttendanceCancel): Promise<void> {
    
  
    return this.dataSource
      .transaction(async (manager: EntityManager) => {
        const attendance = await manager.findOne(AttendanceEntity, {
          where: { id: attendanceId },
          relations: ['userEntity', 'eventEntity'],
        });

        if (!attendance) {
          throw new BadRequestException('Registration not found');
        }

        const event = await this.eventService.findEventOrThrow(attendance.eventEntity.id);
        const user = await this.userService.findUserOrThrow(attendanceCancel.userId);
        // Kiểm tra quyền hủy
        if (attendance.userEntity.id !== user.id) {
          throw new BadRequestException(
            'User is not authorized to cancel this registration',
          );
        }

        // Chỉ cho phép hủy khi sự kiện chưa bắt đầu
        if (event.status !== EventStatus.UPCOMING) {
          throw new BadRequestException('Event is ongoing, cannot cancel registration');
        }

        // Kiểm tra trạng thái hiện tại
        if (attendance.status === AttendanceStatus.CANCELLED) {
          throw new BadRequestException('Registration already canceled');
        }

        // Cập nhật trạng thái và thời gian hủy
        attendance.status = AttendanceStatus.CANCELLED;
        attendance.cancelledAt = new Date();
        await manager.save(AttendanceEntity, attendance);
      })
      .catch((error) => {
        throw new BadRequestException(`Cancellation failed: ${error.message}`);
      });
  }
}
