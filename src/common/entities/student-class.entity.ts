import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Student } from './student.entity';
import { Class } from './class.entity';

@Entity()
export class StudentClass {
  @PrimaryColumn()
  studentId: number;

  @PrimaryColumn()
  classId: number;

  @Column()
  score: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Student, (student) => student.studentClasses, {
    onDelete: 'CASCADE',
  })
  student: Student;

  @ManyToOne(() => Class, (classEntity) => classEntity.studentClasses, {
    onDelete: 'CASCADE',
  })
  classEntity: Class;
}
