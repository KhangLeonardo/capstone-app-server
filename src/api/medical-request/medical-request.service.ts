import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalRequest } from 'src/common/entities/medical-request.entity';
import { Student } from 'src/common/entities/student.entity';
import { Repository } from 'typeorm';
import { CreateMedicalRequestDto } from './dto/create-medical-request.dto';
import { UpdateMedicalRequestDto } from './dto/update-medical-request.dto';

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
    async create(parentId: number,createMedicalRequestDto: CreateMedicalRequestDto): Promise<MedicalRequest> {
        const student = await this.studentRepository
        .createQueryBuilder('student')
        .where('student.name = :student_name', { student_name: createMedicalRequestDto.student_name })
        .andWhere('student.parent_id = :parentId', { parentId })
        .getOne();

        if (!student) {
            throw new NotFoundException('Không tìm thấy học sinh')
        }
        const existingRequest = await this.medicalRequestRepository.findOne({
            where: {
                student: student
            }
        });
        if (existingRequest) {
            throw new ConflictException('Đã tồn tại yêu cầu y tế cho học sinh này');
        }
        const medicalRequest = new MedicalRequest();
        medicalRequest.student = student;
        medicalRequest.notes = createMedicalRequestDto.notes;
        const savedRequest =  await this.medicalRequestRepository.save(medicalRequest);
        throw new HttpException({
            status: HttpStatus.CREATED,
            message: 'Tạo yêu cầu y té thành công',
            data: savedRequest,
        }, HttpStatus.CREATED);
    }
    async update(parentId: number, id: number, updateMedicalRequestDto: UpdateMedicalRequestDto): Promise<MedicalRequest> {
        const medicalRequest = await this.medicalRequestRepository.findOne({
            where: { id },
            relations: ['student'],
          });
        if (!medicalRequest) {
            throw new NotFoundException("Yêu cầu y tế không được tìm thấy");
        }
        if (medicalRequest.student.parent_id !== parentId) {
            throw new UnauthorizedException('Bạn không có quyền cập nhật yêu cầu y tế này');
        }

        medicalRequest.notes = updateMedicalRequestDto.notes;
        const updatedRequest =  await this.medicalRequestRepository.save(medicalRequest);
        throw new HttpException({
            status: HttpStatus.OK,
            message: 'Cập nhật yêu cầu y tế thành công',
            data: updatedRequest,
          }, HttpStatus.OK);
    }
    
    async remove(parentId: number, id: number): Promise<void> {
        const medicalRequest = await this.medicalRequestRepository.findOne({
            where: { id },
            relations: ['student'],
          });
        if (!medicalRequest) {
            throw new NotFoundException("Yêu cầu y tế không được tìm thấy");
        }
        if (medicalRequest.student.parent_id !== parentId) {
            throw new UnauthorizedException('Bạn không có quyền xoá yêu cầu y tế này');
        }
        await this.medicalRequestRepository.remove(medicalRequest);
        throw new HttpException({
            status: HttpStatus.OK,
            message: 'Xoá yêu cầu y tế thành công',
        }, HttpStatus.OK);
    }
}
