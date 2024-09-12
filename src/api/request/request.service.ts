import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Request } from 'src/common/entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { ClassStudent } from 'src/common/entities/class-student.entity';


@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(Request)
        private requestRepository: Repository<Request>, 

        @InjectRepository(ClassStudent)
        private classStudentRepository: Repository<ClassStudent>
    ) {}

    // Updated to return all requests for a parent’s children
    async findAllRequests(parentId: number): Promise<Request[]> {
        const sql = `
            SELECT DISTINCT
                r.id,
                r.student_id,
                r.class_id,
                r.status as request_status,
                r.request_type,
                r.start_time,
                r.end_time,
                r.reason,
                s.name as student_name,
                s.parent_id
            FROM 
                requests r
            INNER JOIN 
                students s ON r.student_id = s.id
            INNER JOIN 
                class_students cs ON s.id = cs.student_id
            WHERE 
                s.parent_id = $1
        `;
        const results = await this.requestRepository.query(sql, [parentId]);
        console.log(results)

        // Handle empty results scenario if needed
        if (results.length === 0) {
            throw new NotFoundException(`No requests found for parent with ID ${parentId}`);
        }

        return results;
    }
    
    async createRequest(parentId: number, studentId: number, createRequestDto: CreateRequestDto): Promise<Request> {
        // Validate if the student belongs to the parent
        const classStudent = await this.classStudentRepository
            .createQueryBuilder('cs')
            .innerJoinAndSelect('cs.student', 'student')
            .innerJoinAndSelect('cs.class', 'class')
            .where('student.parent_id = :parentId', { parentId })
            .andWhere('student.id = :studentId', { studentId })
            .getOne();

        // If no result, student either doesn't exist or is not the parent's child
        if (!classStudent) {
            throw new NotFoundException('Student not found or does not belong to the parent');
        }

        // Create and save the request, linking it to the student and the class
        const request = this.requestRepository.create({
            ...createRequestDto,
            student_id: classStudent.student.id,
            class_id: classStudent.class.id,
            status: "pending",  // Assuming 'pending' is the default status for new requests
        });

        await this.requestRepository.save(request);

        return request;
    }
}
