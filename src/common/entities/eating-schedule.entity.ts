import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Class } from './class.entity';

@Entity('eating_schedules')
export class EatingSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  class_id: number;

  @ManyToOne(() => Class, (classEntity) => classEntity.eatingSchedules)
  @JoinColumn({ name: 'class_id' })
  classEntity: Class;

  @Column({ type: 'timestamptz', nullable: false })
  schedule_time: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}