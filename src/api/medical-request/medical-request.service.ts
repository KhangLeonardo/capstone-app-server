import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRequest } from 'src/common/entities/medical-request.entity';
import { Student } from 'src/common/entities/student.entity';
import { Repository } from 'typeorm';
import { CreateMedicalRequestDto } from './dto/create-medical-request.dto';

@Injectable()
export class MedicalRequestService {
    constructor(
        @InjectRepository(MedicalRequest) 
        private medicalRequestRepository: Repository<MedicalRequest>,
        @InjectRepository(Student)
        private studentRepository: Repository<Student>  
    ) {}

    async findAllByParentId(parentId: number): Promise<MedicalRequest[]> {
        return this.medicalRequestRepository
          .createQueryBuilder('medical_request')
          .innerJoinAndSelect('medical_request.student', 'student')
          .where('student.parent_id = :parentId', { parentId })
          .getMany();
      }
    // async create(parentId: number,createMedicalRequestDto: CreateMedicalRequestDto): Promise<MedicalRequest> {
    //     const student = await this.studentRepository
    //     .createQueryBuilder('student')
    //     .where('student.id = :studentId', { studentId: createMedicalRequestDto.studentId })
    //     .andWhere('student.parentId = :parentId', { parentId })
    //     .getOne();

    //     if (!student) {
    //         throw new NotFoundException('Không tìm thấy học sinh')
    //     }
    //     const existingRequest = await this.medicalRequestRepository.findOne9{
    //         where: {
    //             student: student
    //         }
    //     }
    //     if (existingRequest) {
    //         throw new ConflictException('Đã tồn tại yêu cầu y tế cho học sinh này');
    //     }
    //     const medicalRequest = new MedicalRequest();
    //     medicalRequest.student = student;
    //     medicalRequest.notes = createMedicalRequestDto.notes;
    //     return this.medicalRequestRepository.save(medicalRequest);
    // }
}
