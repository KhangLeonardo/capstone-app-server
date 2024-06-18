import { Injectable } from '@nestjs/common';
import { CreateYearLevelDto } from './dto/create-year-level.dto';
import { UpdateYearLevelDto } from './dto/update-year-level.dto';

@Injectable()
export class YearLevelService {
  create(createYearLevelDto: CreateYearLevelDto) {
    return 'This action adds a new yearLevel';
  }

  findAll() {
    return `This action returns all yearLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} yearLevel`;
  }

  update(id: number, updateYearLevelDto: UpdateYearLevelDto) {
    return `This action updates a #${id} yearLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} yearLevel`;
  }
}
