import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentYearLevel } from '../../common/entities/student-year-level.entity';
import {
  CreateStudentYearLevelDto,
  UpdateStudentYearLevelDto,
} from './dto/create-student-year-level.dto';

@Injectable()
export class StudentYearLevelService {
  constructor(
    @InjectRepository(StudentYearLevel)
    private studentYearLevelRepository: Repository<StudentYearLevel>,
  ) {}

  create(createStudentYearLevelDto: CreateStudentYearLevelDto) {
    const studentYearLevel = this.studentYearLevelRepository.create(
      createStudentYearLevelDto,
    );
    return this.studentYearLevelRepository.save(studentYearLevel);
  }

  findAll() {
    return this.studentYearLevelRepository.find();
  }

  findOne(studentId: number, yearLevelId: number) {
    return this.studentYearLevelRepository.findOne({
      where: { studentId, yearLevelId },
    });
  }

  update(
    studentId: number,
    yearLevelId: number,
    updateStudentYearLevelDto: UpdateStudentYearLevelDto,
  ) {
    return this.studentYearLevelRepository.update(
      { studentId, yearLevelId },
      updateStudentYearLevelDto,
    );
  }

  remove(studentId: number, yearLevelId: number) {
    return this.studentYearLevelRepository.delete({ studentId, yearLevelId });
  }
}
