import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailySchedule } from '../../common/entities/daily-schedule.entity';
import {
  CreateDailyScheduleDto,
  UpdateDailyScheduleDto,
} from './dto/create-daily-schedule.dto';

@Injectable()
export class DailyScheduleService {
  constructor(
    @InjectRepository(DailySchedule)
    private dailyScheduleRepository: Repository<DailySchedule>,
  ) {}

  create(createDailyScheduleDto: CreateDailyScheduleDto) {
    const schedule = this.dailyScheduleRepository.create(
      createDailyScheduleDto,
    );
    return this.dailyScheduleRepository.save(schedule);
  }

  findAll() {
    return this.dailyScheduleRepository.find();
  }

  findOne(id: number) {
    return this.dailyScheduleRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateDailyScheduleDto: UpdateDailyScheduleDto) {
    return this.dailyScheduleRepository.update(id, updateDailyScheduleDto);
  }

  remove(id: number) {
    return this.dailyScheduleRepository.delete(id);
  }
}
