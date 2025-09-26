import { AbstractEntity } from '../../../common/abstract.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { AttendanceStatus } from "../domain/attendance-status";
import { EventEntity } from '../../event/entities/event.entity';
import type { Uuid } from 'src/common/types';

@Entity('attendances')
@Unique(['userId', 'eventId'])
export class AttendanceEntity extends AbstractEntity{
  @Column({name: 'user_id'})
  userId: Uuid;

  @ManyToOne(() => UserEntity, (user) => user.attendances, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column({name: 'event_id'})
  eventId: Uuid;

  @ManyToOne(() => EventEntity, (eventEntity) => eventEntity.attendances, {
        onDelete: 'CASCADE'
    })
  event: EventEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'registered_at' })
  registeredAt: Date;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.REGISTERED,
  })
  status: AttendanceStatus;

  @Column({ type: 'timestamp', nullable: true, name: 'cancelled_at' })
  cancelledAt: Date | null;
}
