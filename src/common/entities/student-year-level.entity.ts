import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { YearLevel } from './year-level.entity';

@Entity()
export class StudentYearLevel {
  @PrimaryColumn()
  student_id: number;

  @PrimaryColumn()
  year_level_id: number;

  @Column({ nullable: true })
  score: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Student, (student) => student.studentYearLevels, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => YearLevel, (yearLevel) => yearLevel.studentYearLevels, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'year_level_id' })
  yearLevel: YearLevel;
}
