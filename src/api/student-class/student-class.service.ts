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

  findOne(student_id: number, class_id: number) {
    return this.studentClassRepository.findOne({
      where: { student_id, class_id },
    });
  }

  update(
    student_id: number,
    class_id: number,
    updateStudentClassDto: UpdateStudentClassDto,
  ) {
    return this.studentClassRepository.update(
      { student_id, class_id },
      updateStudentClassDto,
    );
  }

  remove(student_id: number, class_id: number) {
    return this.studentClassRepository.delete({ student_id, class_id });
  }
}
