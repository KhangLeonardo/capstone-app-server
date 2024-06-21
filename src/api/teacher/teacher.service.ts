import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../../common/entities/teacher.entity';
import { CreateTeacherDto, UpdateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  create(createTeacherDto: CreateTeacherDto) {
    const teacher = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(teacher);
  }

  findAll() {
    return this.teacherRepository.find();
  }

  findOne(id: number) {
    return this.teacherRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return this.teacherRepository.update(id, updateTeacherDto);
  }

  remove(id: number) {
    return this.teacherRepository.delete(id);
  }
}
