import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Class } from './class.entity';
import { Period } from './period.entity';
import { DayOfWeek } from '../enum/day_of_week.enum';

@Entity()
export class DailySchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: DayOfWeek })
  day_of_week: DayOfWeek;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Class, (classEntity) => classEntity.dailySchedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'class_id' }) // Assuming class_id column is used
  classEntity: Class;

  @ManyToOne(() => Period, (period) => period.dailySchedules, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'period_id' }) // Assuming period_id column is used
  period: Period;
}
