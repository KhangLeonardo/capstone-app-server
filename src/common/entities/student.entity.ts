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
import { StudentParent } from './student-parent.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  date_of_birth: Date;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: false })
  school_id: number;

  @ManyToOne(() => User, (user) => user.students)
  @JoinColumn({ name: 'parent_id' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToMany(() => Parent, (parent) => parent.students)
  @JoinTable({
    name: 'student_parent',
    joinColumn: { name: 'student_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'parent_id', referencedColumnName: 'id' },
  })
  parent: Parent[];

  @OneToMany(() => StudentParent, (studentParent) => studentParent.student)
  studentParents: StudentParent[];

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
