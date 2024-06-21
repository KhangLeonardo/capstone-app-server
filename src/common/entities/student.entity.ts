import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Parent } from './parent.entity';
import { Gender } from '../enum/gender_t.enum';
import { StudentClass } from './student-class.entity';
import { Attendance } from './attendance.entity';
import { StudentYearLevel } from './student-year-level.entity';
import { User } from './user.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  givenName: string;

  @Column()
  surname: string;

  @Column({ nullable: true })
  middleName: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  dateOfBirth: Date;

  @Column({ nullable: true })
  emailAddress: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: false })
  school_id: number;

  @ManyToOne(() => User, (user) => user.students)
  @JoinColumn({ name: 'parent_id' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToMany(() => Parent, (parent) => parent.students)
  @JoinTable({
    name: 'student_guardian',
    joinColumn: { name: 'student_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'guardian_id', referencedColumnName: 'id' },
  })
  parent: Parent[];

  @OneToMany(() => StudentClass, (studentClass) => studentClass.student)
  studentClasses: StudentClass[];

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendances: Attendance[];

  @OneToMany(
    () => StudentYearLevel,
    (studentYearLevel) => studentYearLevel.student,
  )
  studentYearLevels: StudentYearLevel[];
}
