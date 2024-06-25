import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SchoolYear } from './school-year.entity';
import { Class } from './class.entity';

@Entity()
export class Term {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  term_number: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => SchoolYear, (schoolYear) => schoolYear.terms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'school_year_id' })
  schoolYear: SchoolYear;

  @OneToMany(() => Class, (classEntity) => classEntity.term)
  classes: Class[];
}
