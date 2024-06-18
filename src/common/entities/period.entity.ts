import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { SchoolYear } from '../entities/school-year.entity';
  import { DailySchedule } from '../entities/daily-schedule.entity';
  
  @Entity()
  export class Period {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    startTime: string;
  
    @Column()
    endTime: string;
  
    @ManyToOne(() => SchoolYear, schoolYear => schoolYear.periods, { onDelete: 'CASCADE' })
    schoolYear: SchoolYear;
  
    @OneToMany(() => DailySchedule, dailySchedule => dailySchedule.period)
    dailySchedules: DailySchedule[];
  }
  