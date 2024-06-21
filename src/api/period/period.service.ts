import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Period } from '../../common/entities/period.entity';
import { CreatePeriodDto, UpdatePeriodDto } from './dto/create-period.dto';

@Injectable()
export class PeriodService {
  constructor(
    @InjectRepository(Period)
    private periodRepository: Repository<Period>,
  ) {}

  create(createPeriodDto: CreatePeriodDto) {
    const period = this.periodRepository.create(createPeriodDto);
    return this.periodRepository.save(period);
  }

  findAll() {
    return this.periodRepository.find();
  }

  findOne(id: number) {
    return this.periodRepository.findOne({ where: { id: id } });
  }

  update(id: number, updatePeriodDto: UpdatePeriodDto) {
    return this.periodRepository.update(id, updatePeriodDto);
  }

  remove(id: number) {
    return this.periodRepository.delete(id);
  }
}
