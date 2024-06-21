import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { YearLevel } from '../../common/entities/year-level.entity';
import {
  CreateYearLevelDto,
  UpdateYearLevelDto,
} from './dto/create-year-level.dto';

@Injectable()
export class YearLevelService {
  constructor(
    @InjectRepository(YearLevel)
    private yearLevelRepository: Repository<YearLevel>,
  ) {}

  create(createYearLevelDto: CreateYearLevelDto) {
    const yearLevel = this.yearLevelRepository.create(createYearLevelDto);
    return this.yearLevelRepository.save(yearLevel);
  }

  findAll() {
    return this.yearLevelRepository.find();
  }

  findOne(id: number) {
    return this.yearLevelRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateYearLevelDto: UpdateYearLevelDto) {
    return this.yearLevelRepository.update(id, updateYearLevelDto);
  }

  remove(id: number) {
    return this.yearLevelRepository.delete(id);
  }
}
