import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Attendance } from './attendance.entity';

@Entity()
export class Absence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  reason: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Attendance, (attendance) => attendance.absence)
  attendances: Attendance[];
}
