import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { SchoolYear } from '../entities/school-year.entity';
  import { Class } from '../entities/class.entity';
  
  @Entity()
  export class Term {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    startDate: Date;
  
    @Column()
    endDate: Date;
  
    @Column()
    termNumber: number;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @ManyToOne(() => SchoolYear, schoolYear => schoolYear.terms, { onDelete: 'CASCADE' })
    schoolYear: SchoolYear;
  
    @OneToMany(() => Class, classEntity => classEntity.term)
    classes: Class[];
  }
  