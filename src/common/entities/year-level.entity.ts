import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StudentYearLevel } from './student-year-level.entity';

@Entity()
export class YearLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level_name: string;

  @Column()
  level_order: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(
    () => StudentYearLevel,
    (studentYearLevel) => studentYearLevel.yearLevel,
  )
  studentYearLevels: StudentYearLevel[];
}
