import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
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
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => ClassroomType, (classroomType) => classroomType.classrooms)
  @JoinColumn({ name: 'classroom_type_id' })
  classroomType: ClassroomType;

  @OneToMany(() => Class, (classEntity) => classEntity.classroom)
  classes: Class[];
}
