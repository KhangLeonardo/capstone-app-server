import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Classroom } from './classroom.entity';

@Entity()
export class ClassroomType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Classroom, (classroom) => classroom.classroomType)
  classrooms: Classroom[];
}
