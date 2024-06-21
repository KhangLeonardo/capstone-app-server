import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
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
  startTime: Date;

  @Column()
  endTime: Date;

  @ManyToOne(() => SchoolYear, (schoolYear) => schoolYear.periods, {
    onDelete: 'CASCADE',
  })
  schoolYear: SchoolYear;

  @OneToMany(() => DailySchedule, (dailySchedule) => dailySchedule.period)
  dailySchedules: DailySchedule[];
}
