import * as timers from 'node:timers';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventStatus } from '../domain/event-status';
import { EventType } from '../domain/event-type';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string | null;

  @Column({ type: 'timestamp' })
  timeStart: Date;

  @Column({ type: 'timestamp' })
  timeEnd: Date;

  @Column({ nullable: true, type: "varchar", length: 255 })
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
