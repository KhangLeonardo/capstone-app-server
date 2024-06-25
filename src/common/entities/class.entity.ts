import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Term } from './term.entity';
import { StudentClass } from './student-class.entity';
import { DailySchedule } from './daily-schedule.entity';
import { Classroom } from './classroom.entity';
import { Attendance } from './attendance.entity';
import { Subject } from './subject.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @ManyToOne(() => Teacher, (teacher) => teacher.classes, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'teacher_id' })
  teacher: Teacher;

  @ManyToOne(() => Term, (term) => term.classes, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'term_id' })
  term: Term;

  @ManyToOne(() => Classroom, (classroom) => classroom.classes, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'classroom_id' })
  classroom: Classroom;

  @ManyToOne(() => Subject, (subject) => subject.classes, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @OneToMany(() => Attendance, (attendance) => attendance.class)
  attendances: Attendance[];

  @OneToMany(() => StudentClass, (studentClass) => studentClass.classEntity)
  studentClasses: StudentClass[];

  @OneToMany(() => DailySchedule, (dailySchedule) => dailySchedule.classEntity)
  dailySchedules: DailySchedule[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
