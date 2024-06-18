import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { Teacher } from '../entities/teacher.entity';
  import { Term } from '../entities/term.entity';
  import { StudentClass } from '../entities/student-class.entity';
  import { DailySchedule } from '../entities/daily-schedule.entity';
  import { Classroom } from '../entities/classroom.entity';
  
  @Entity()
  export class Class {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    subjectId: number;
  
    @Column()
    startTime: Date;
  
    @Column()
    endTime: Date;
  
    @ManyToOne(() => Teacher, teacher => teacher.classes, { onDelete: 'SET NULL' })
    teacher: Teacher;
  
    @ManyToOne(() => Term, term => term.classes, { onDelete: 'SET NULL' })
    term: Term;
  
    @ManyToOne(() => Classroom, classroom => classroom.classes, { onDelete: 'SET NULL' })
    classroom: Classroom;
  
    @OneToMany(() => StudentClass, studentClass => studentClass.classEntity)
    studentClasses: StudentClass[];
  
    @OneToMany(() => DailySchedule, dailySchedule => dailySchedule.classEntity)
    dailySchedules: DailySchedule[];
  }
  