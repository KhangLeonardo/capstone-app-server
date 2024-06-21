import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Class } from './class.entity';
import { Period } from './period.entity';
import { DayOfWeek } from '../enum/day_of_week.enum';

@Entity()
export class DailySchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: DayOfWeek })
  dayOfWeek: DayOfWeek;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Class, (classEntity) => classEntity.dailySchedules, {
    onDelete: 'CASCADE',
  })
  classEntity: Class;

  @ManyToOne(() => Period, (period) => period.dailySchedules, {
    onDelete: 'CASCADE',
  })
  period: Period;
}
