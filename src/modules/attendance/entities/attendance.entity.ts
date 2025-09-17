import { UserEntity } from '../../user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { AttendanceStatus } from "../domain/attendance-status";
import { EventEntity } from '../../event/entities/event.entity';

@Entity('attendances')
@Unique(['userEntity', 'eventEntity'])
export class AttendanceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity,
        (user) => user.attendanceEntities,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'userId' })
    userEntity: UserEntity;

    @ManyToOne(() => EventEntity,
        (eventEntity) => eventEntity.attendanceEntities,
        { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'eventId' })
    eventEntity: EventEntity;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    registeredAt: Date;

    @Column({
        type: 'enum',
        enum: AttendanceStatus,
        default: AttendanceStatus.REGISTERED
    })
    status: AttendanceStatus;

    @Column({ type: 'timestamp', nullable: true })
    cancelledAt: Date | null;

}
