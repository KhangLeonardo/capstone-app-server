import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentParent } from '../../common/entities/student-parent.entity';
import {
  CreateStudentParentDto,
  UpdateStudentParentDto,
} from './dto/create-student-parent.dto';

@Injectable()
export class StudentParentService {
  constructor(
    @InjectRepository(StudentParent)
    private studentParentRepository: Repository<StudentParent>,
  ) {}

  create(createStudentParentDto: CreateStudentParentDto) {
    const studentParent = this.studentParentRepository.create(
      createStudentParentDto,
    );
    return this.studentParentRepository.save(studentParent);
  }

  findAll() {
    return this.studentParentRepository.find();
  }

  findOne(student_id: number, parent_id: number) {
    return this.studentParentRepository.findOne({
      where: { student_id, parent_id },
    });
  }

  update(
    student_id: number,
    parent_id: number,
    updateStudentParentDto: UpdateStudentParentDto,
  ) {
    return this.studentParentRepository.update(
      { student_id, parent_id },
      updateStudentParentDto,
    );
  }

  remove(student_id: number, parent_id: number) {
    return this.studentParentRepository.delete({ student_id, parent_id });
  }
}
