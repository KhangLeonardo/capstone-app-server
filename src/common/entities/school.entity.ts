import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './post.entity';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';
import { Class } from './class.entity';

@Entity('schools')
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  name: string;

  @OneToMany(() => Student, (student) => student.school)
  students: Student[];

  @OneToMany(() => Teacher, (teacher) => teacher.school)
  teachers: Teacher[];

  @OneToMany(() => Class, (classEntity) => classEntity.school)
  classes: Class[];

  @OneToMany(() => Post, (post) => post.school)
  posts: Post[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
