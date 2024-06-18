import {
    Entity,
    PrimaryColumn,
    ManyToOne,
  } from 'typeorm';
  import { Student } from '../entities/student.entity';
  import { Parent } from '../entities/parent.entity';
  
  @Entity()
  export class StudentParent {
    @PrimaryColumn()
    studentId: number;
  
    @PrimaryColumn()
    parentId: number;
  
    @ManyToOne(() => Student, student => student.parent, { onDelete: 'CASCADE' })
    student: Student;
  
    @ManyToOne(() => Parent, parent => parent.students, { onDelete: 'CASCADE' })
    parent: Parent;
  }
  