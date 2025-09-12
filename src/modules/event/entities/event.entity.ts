import * as timers from 'node:timers';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventStatus } from '../../../common/enums/event-status';
import { EventType } from '../../../common/enums/event-type';
@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  timeStart: string;

  @Column({ type: 'time' })
  timeEnd: string;

  @Column({ nullable: true })
  venue: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
