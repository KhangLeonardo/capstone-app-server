import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Student } from './student.entity';
import { YearLevel } from './year-level.entity';

@Entity()
export class StudentYearLevel {
  @PrimaryColumn()
  studentId: number;

  @PrimaryColumn()
  yearLevelId: number;

  @Column()
  score: number;

  @Column()
  enrolmentDate: Date;

  @ManyToOne(() => Student, (student) => student.studentYearLevels, {
    onDelete: 'CASCADE',
  })
  student: Student;

  @ManyToOne(() => YearLevel, (yearLevel) => yearLevel.studentYearLevels, {
    onDelete: 'CASCADE',
  })
  yearLevel: YearLevel;
}
