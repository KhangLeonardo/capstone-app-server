import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolYear } from '../../common/entities/school-year.entity';
import {
  CreateSchoolYearDto,
  UpdateSchoolYearDto,
} from './dto/create-school-year.dto';

@Injectable()
export class SchoolYearService {
  constructor(
    @InjectRepository(SchoolYear)
    private schoolYearRepository: Repository<SchoolYear>,
  ) {}

  create(createSchoolYearDto: CreateSchoolYearDto) {
    const schoolYear = this.schoolYearRepository.create(createSchoolYearDto);
    return this.schoolYearRepository.save(schoolYear);
  }

  findAll() {
    return this.schoolYearRepository.find();
  }

  findOne(id: number) {
    return this.schoolYearRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateSchoolYearDto: UpdateSchoolYearDto) {
    return this.schoolYearRepository.update(id, updateSchoolYearDto);
  }

  remove(id: number) {
    return this.schoolYearRepository.delete(id);
  }
}
