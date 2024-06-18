import { Injectable } from '@nestjs/common';
import { CreateDailyScheduleDto } from './dto/create-daily-schedule.dto';
import { UpdateDailyScheduleDto } from './dto/update-daily-schedule.dto';

@Injectable()
export class DailyScheduleService {
  create(createDailyScheduleDto: CreateDailyScheduleDto) {
    return 'This action adds a new dailySchedule';
  }

  findAll() {
    return `This action returns all dailySchedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dailySchedule`;
  }

  update(id: number, updateDailyScheduleDto: UpdateDailyScheduleDto) {
    return `This action updates a #${id} dailySchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailySchedule`;
  }
}
