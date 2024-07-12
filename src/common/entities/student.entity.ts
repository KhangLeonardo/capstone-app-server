import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { School } from './school.entity';
import { ClassStudent } from './class-student.entity';
import { Absence } from './absence.entity';
import { MedicalRequest } from './medical-request.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ nullable: false })
  school_id: number;

  @ManyToOne(() => School, (school) => school.students)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @Column({ nullable: false })
  parent_id: number;

  @ManyToOne(() => User, (user) => user.students)
  @JoinColumn({ name: 'parent_id' })
  user: User;

  @OneToMany(() => ClassStudent, (classStudent) => classStudent.student)
  classStudents: ClassStudent[];

  @OneToMany(() => Absence, (absence) => absence.student)
  absences: Absence[];

  @OneToMany(() => MedicalRequest, medicalRequest => medicalRequest.student)
  medicalRequests: MedicalRequest[];
  
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
