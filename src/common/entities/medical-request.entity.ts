import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student.entity";

@Entity('medical_requests')
export class MedicalRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    student_id: number;

    @ManyToOne(() => Student, student => student.medicalRequests)
    @JoinColumn({name: 'student_id'})
    student: Student;

    @Column('text')
    notes: string;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;




}