import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from './student.entity';
import { Parent } from './parent.entity';

@Entity()
export class StudentParent {
  @PrimaryColumn()
  student_id: number;

  @PrimaryColumn()
  parent_id: number;

  @ManyToOne(() => Student, (student) => student.studentParents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Parent, (parent) => parent.studentParent, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  parent: Parent;
}
