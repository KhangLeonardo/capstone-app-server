import { Injectable } from '@nestjs/common';
import { CreateStudentParentDto } from './dto/create-student-parent.dto';
import { UpdateStudentParentDto } from './dto/update-student-parent.dto';

@Injectable()
export class StudentParentService {
  create(createStudentParentDto: CreateStudentParentDto) {
    return 'This action adds a new studentParent';
  }

  findAll() {
    return `This action returns all studentParent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentParent`;
  }

  update(id: number, updateStudentParentDto: UpdateStudentParentDto) {
    return `This action updates a #${id} studentParent`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentParent`;
  }
}
