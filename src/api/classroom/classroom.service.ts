import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classroom } from '../../common/entities/classroom.entity';
import {
  CreateClassroomDto,
  UpdateClassroomDto,
} from './dto/create-classroom.dto';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
  ) {}

  create(createClassroomDto: CreateClassroomDto) {
    const classroom = this.classroomRepository.create(createClassroomDto);
    return this.classroomRepository.save(classroom);
  }

  findAll() {
    return this.classroomRepository.find();
  }

  findOne(id: number) {
    return this.classroomRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return this.classroomRepository.update(id, updateClassroomDto);
  }

  remove(id: number) {
    return this.classroomRepository.delete(id);
  }
}
