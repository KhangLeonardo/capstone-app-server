import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Term } from './term.entity';
import { Period } from './period.entity';

@Entity()
export class SchoolYear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Term, (term) => term.schoolYear)
  terms: Term[];

  @OneToMany(() => Period, (period) => period.schoolYear)
  periods: Period[];
}
