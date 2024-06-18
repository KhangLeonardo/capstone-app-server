import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Term } from '../entities/term.entity';
  import { Period } from '../entities/period.entity';
  
  @Entity()
  export class SchoolYear {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    yearName: string;
  
    @Column()
    startDate: Date;
  
    @Column()
    endDate: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @OneToMany(() => Term, term => term.schoolYear)
    terms: Term[];
  
    @OneToMany(() => Period, period => period.schoolYear)
    periods: Period[];
  }
  