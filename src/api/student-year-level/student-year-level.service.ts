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

  findOne(student_id: number, year_level_id: number) {
    return this.studentYearLevelRepository.findOne({
      where: { student_id, year_level_id },
    });
  }

  update(
    student_id: number,
    year_level_id: number,
    updateStudentYearLevelDto: UpdateStudentYearLevelDto,
  ) {
    return this.studentYearLevelRepository.update(
      { student_id, year_level_id },
      updateStudentYearLevelDto,
    );
  }

  remove(student_id: number, year_level_id: number) {
    return this.studentYearLevelRepository.delete({
      student_id,
      year_level_id,
    });
  }
}
