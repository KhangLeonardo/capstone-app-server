import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Attendance } from '../entities/attendance.entity';
  
  @Entity()
  export class Absence {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: true })
    reason: string;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  
    @OneToMany(() => Attendance, attendance => attendance.absence)
    attendances: Attendance[];
}
  