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

  findOne(studentId: number, parentId: number) {
    return this.studentParentRepository.findOne({
      where: { studentId, parentId },
    });
  }

  update(
    studentId: number,
    parentId: number,
    updateStudentParentDto: UpdateStudentParentDto,
  ) {
    return this.studentParentRepository.update(
      { studentId, parentId },
      updateStudentParentDto,
    );
  }

  remove(studentId: number, parentId: number) {
    return this.studentParentRepository.delete({ studentId, parentId });
  }
}
