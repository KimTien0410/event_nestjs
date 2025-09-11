import * as timers from 'node:timers';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  time_start: string;

  @Column({ type: 'time' })
  time_end: string;

  @Column({ nullable: true })
  venue: string;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming',
  })
  status: string;

  @Column({
    type: 'enum',
    enum: ['online', 'offline', 'hybrid'],
    default: 'offline',
  })
  type: string;

  @Column()
  capacity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
