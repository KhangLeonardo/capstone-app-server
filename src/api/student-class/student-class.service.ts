import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentClass } from '../../common/entities/student-class.entity';
import {
  CreateStudentClassDto,
  UpdateStudentClassDto,
} from './dto/create-student-class.dto';

@Injectable()
export class StudentClassService {
  constructor(
    @InjectRepository(StudentClass)
    private studentClassRepository: Repository<StudentClass>,
  ) {}

  create(createStudentClassDto: CreateStudentClassDto) {
    const studentClass = this.studentClassRepository.create(
      createStudentClassDto,
    );
    return this.studentClassRepository.save(studentClass);
  }

  findAll() {
    return this.studentClassRepository.find();
  }

  findOne(studentId: number, classId: number) {
    return this.studentClassRepository.findOne({
      where: { studentId, classId },
    });
  }

  update(
    studentId: number,
    classId: number,
    updateStudentClassDto: UpdateStudentClassDto,
  ) {
    return this.studentClassRepository.update(
      { studentId, classId },
      updateStudentClassDto,
    );
  }

  remove(studentId: number, classId: number) {
    return this.studentClassRepository.delete({ studentId, classId });
  }
}
