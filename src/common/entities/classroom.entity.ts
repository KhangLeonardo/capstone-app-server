import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ClassroomType } from '../entities/classroom-types.entity';
import { Class } from '../entities/class.entity';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  period: Date;

  @Column()
  summary: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => ClassroomType, (classroomType) => classroomType.classrooms)
  classroomType: ClassroomType;

  @OneToMany(() => Class, (classEntity) => classEntity.classroom)
  classes: Class[];
}
