import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Student } from './student.entity';
import { StudentParent } from './student-parent.entity';

@Entity()
export class Parent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  givenName: string;

  @Column()
  surname: string;

  @Column({ nullable: true })
  emailAddress: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToMany(() => Student, (student) => student.parent)
  students: Student[];

  @OneToMany(() => StudentParent, (studentGuardian) => studentGuardian.parent)
  studentParent: StudentParent[];
}
