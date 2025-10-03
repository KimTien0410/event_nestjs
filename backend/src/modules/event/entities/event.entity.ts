import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventStatus } from '../domain/event-status';
import { EventType } from '../domain/event-type';
import { AttendanceEntity } from '../../attendance/entities/attendance.entity';
import { AbstractEntity } from '../../../common/abstract.entity';

@Entity('events')
export class EventEntity extends AbstractEntity {
  @Column()
  title: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  googleEventId: string | null;

  @Column({ nullable: true, type: 'text' })
  description: string | null;

  @Column({ type: 'timestamp', name: 'time_start' })
  timeStart: Date;

  @Column({ type: 'timestamp', name: 'time_end' })
  timeEnd: Date;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  venue: string | null;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.UPCOMING,
  })
  status: EventStatus;

  @Column({
    type: 'enum',
    enum: EventType,
    default: EventType.OFFLINE,
  })
  type: EventType;

  @Column()
  capacity: number;

  @OneToMany(
    () => AttendanceEntity,
    (attendanceEntity) => attendanceEntity.event,
    { onDelete: 'CASCADE' },
  )
  attendances: AttendanceEntity[];
}
