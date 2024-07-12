import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student.entity";

@Entity('medical_requests')
export class MedicalRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, student => student.medicalRequests)
    student: Student;

    @Column('text')
    notes: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;


}