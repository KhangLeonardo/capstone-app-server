import { Injectable } from '@nestjs/common';
import { CreateClassroomTypeDto } from './dto/create-classroom-type.dto';
import { UpdateClassroomTypeDto } from './dto/update-classroom-type.dto';

@Injectable()
export class ClassroomTypeService {
  create(createClassroomTypeDto: CreateClassroomTypeDto) {
    return 'This action adds a new classroomType';
  }

  findAll() {
    return `This action returns all classroomType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classroomType`;
  }

  update(id: number, updateClassroomTypeDto: UpdateClassroomTypeDto) {
    return `This action updates a #${id} classroomType`;
  }

  remove(id: number) {
    return `This action removes a #${id} classroomType`;
  }
}
