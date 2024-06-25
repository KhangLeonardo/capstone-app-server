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
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(
    () => StudentYearLevel,
    (studentYearLevel) => studentYearLevel.yearLevel,
  )
  studentYearLevels: StudentYearLevel[];
}
