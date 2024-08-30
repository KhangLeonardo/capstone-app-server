import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Request } from 'src/common/entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { ClassStudent } from 'src/common/entities/class-student.entity';
import { RequestStatus } from 'src/common/enum/request_status.enum';


@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(Request)
        private requestRepository: Repository<Request>, 

        @InjectRepository(ClassStudent)
        private classStudentRepository: Repository<ClassStudent>
    ) {}

    async findAllRequests(parentId: number): Promise<Request[]> {
        const sql = `
          SELECT 
            request.student_id,
            request.class_id,
            request.request_status,
            request.request_type,
            request.start_time,
            request.end_time,
            request.reason,
            s."name" as student_name,
            s.parent_id 
          FROM 
            request
          INNER JOIN 
            students s ON request.student_id = s.id 
          INNER JOIN 
            class_students cs ON s.id = cs.student_id
          WHERE 
            s.parent_id = $1
        `;
        const results = await this.requestRepository.query(sql, [parentId]);
        return results;
      }
    
    async createRequest(parentId: number, createRequestDto: CreateRequestDto): Promise<Request> {
        const classStudent = await this.classStudentRepository
            .createQueryBuilder('cs')
            .innerJoinAndSelect('cs.student', 'student')
            .where('student.parent_id = :parent_id', { parent_id: parentId })
            .getOne();

        if (!classStudent) {
            throw new NotFoundException('Student not found');
        }

        const existingRequest = await this.requestRepository.findOne({
            where: {
                student_id: classStudent.student.id,
                class_id: classStudent.class.id,
                start_time: createRequestDto.start_time,
                end_time: createRequestDto.end_time,
            },
        });

        if (existingRequest) {
            throw new ConflictException('Request already exists for this period.');
        }

        const request = this.requestRepository.create({
            ...createRequestDto,
            student_id: classStudent.student.id,
            class_id: classStudent.class.id,
            status: RequestStatus.pending,
        });

        await this.requestRepository.save(request);

        return request;
    }
}
