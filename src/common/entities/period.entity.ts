import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SchoolYear } from './school-year.entity';
import { DailySchedule } from './daily-schedule.entity';

@Entity()
export class Period {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @ManyToOne(() => SchoolYear, (schoolYear) => schoolYear.periods, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'school_year_id' })
  schoolYear: SchoolYear;

  @OneToMany(() => DailySchedule, (dailySchedule) => dailySchedule.period)
  dailySchedules: DailySchedule[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
