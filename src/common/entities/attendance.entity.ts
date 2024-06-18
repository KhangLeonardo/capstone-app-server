import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { Student } from '../entities/student.entity';
  import { Class } from '../entities/class.entity';
  import { Status } from '../enum/status_t.enum';
  import { Absence } from '../entities/absence.entity';
  
  @Entity()
  export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    date: Date;
  
    @Column({ type: 'enum', enum: Status })
    status: Status;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @ManyToOne(() => Student, student => student.attendances, { onDelete: 'CASCADE' })
    student: Student;
  
    @ManyToOne(() => Class, classEntity => classEntity, { onDelete: 'CASCADE' })
    classEntity: Class;
  
    @ManyToOne(() => Absence, absence => absence.attendances)
    absence: Absence;
  }
  