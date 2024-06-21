import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassroomType } from '../../common/entities/classroom-types.entity';
import {
  CreateClassroomTypeDto,
  UpdateClassroomTypeDto,
} from './dto/create-classroom-type.dto';

@Injectable()
export class ClassroomTypeService {
  constructor(
    @InjectRepository(ClassroomType)
    private classroomTypeRepository: Repository<ClassroomType>,
  ) {}

  create(createClassroomTypeDto: CreateClassroomTypeDto) {
    const classroomType = this.classroomTypeRepository.create(
      createClassroomTypeDto,
    );
    return this.classroomTypeRepository.save(classroomType);
  }

  findAll() {
    return this.classroomTypeRepository.find();
  }

  findOne(id: number) {
    return this.classroomTypeRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateClassroomTypeDto: UpdateClassroomTypeDto) {
    return this.classroomTypeRepository.update(id, updateClassroomTypeDto);
  }

  remove(id: number) {
    return this.classroomTypeRepository.delete(id);
  }
}
