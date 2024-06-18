import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Classroom } from '../entities/classroom.entity';
  
  @Entity()
  export class ClassroomType {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    typeName: string;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @OneToMany(() => Classroom, classroom => classroom.classroomType)
    classrooms: Classroom[];
  }
  