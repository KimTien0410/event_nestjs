import { UserEntity } from '../../user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { AttendanceStatus } from "../domain/attendance-status";
import { EventEntity } from '../../event/entities/event.entity';

@Entity('attendances')
@Unique(['userId', 'eventId'])
export class AttendanceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'userId' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.attendances, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @Column({ name: 'eventId' })
  eventId: number;

  @ManyToOne(() => EventEntity, (eventEntity) => eventEntity.attendances, {
        onDelete: 'CASCADE'
    })
  event: EventEntity;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registeredAt: Date;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.REGISTERED,
  })
  status: AttendanceStatus;

  @Column({ type: 'timestamp', nullable: true })
  cancelledAt: Date | null;
}
