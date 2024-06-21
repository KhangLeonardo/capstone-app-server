import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StudentYearLevel } from './student-year-level.entity';

@Entity()
export class YearLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  levelName: string;

  @Column()
  levelOrder: number;

  @Column({ nullable: true })
  scoreRangeMin: number;

  @Column({ nullable: true })
  scoreRangeMax: number;

  @Column({ nullable: true })
  grade: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(
    () => StudentYearLevel,
    (studentYearLevel) => studentYearLevel.yearLevel,
  )
  studentYearLevels: StudentYearLevel[];
}
