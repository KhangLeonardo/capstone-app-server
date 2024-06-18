import { Injectable } from '@nestjs/common';
import { CreateStudentYearLevelDto } from './dto/create-student-year-level.dto';
import { UpdateStudentYearLevelDto } from './dto/update-student-year-level.dto';

@Injectable()
export class StudentYearLevelService {
  create(createStudentYearLevelDto: CreateStudentYearLevelDto) {
    return 'This action adds a new studentYearLevel';
  }

  findAll() {
    return `This action returns all studentYearLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentYearLevel`;
  }

  update(id: number, updateStudentYearLevelDto: UpdateStudentYearLevelDto) {
    return `This action updates a #${id} studentYearLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentYearLevel`;
  }
}
