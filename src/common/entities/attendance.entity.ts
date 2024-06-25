import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Class } from './class.entity';
import { Status } from '../enum/status_t.enum';
import { Absence } from './absence.entity';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ type: 'enum', enum: Status })
  status: Status;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Student, (student) => student.attendances, {
    onDelete: 'CASCADE',
  })
  student: Student;

  @ManyToOne(() => Class, (classEntity) => classEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @ManyToOne(() => Absence, (absence) => absence.attendances)
  @JoinColumn({ name: 'absence_id' })
  absence: Absence;
}
