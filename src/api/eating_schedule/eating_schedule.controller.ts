import { Controller, Post, Body, Param } from '@nestjs/common';
import { EatingScheduleService } from './eating_schedule.service';
import { CreateEatingScheduleDto } from './dto/create-eating_schedule.dto';

@Controller('eating-schedule')
export class EatingScheduleController {
  constructor(private readonly eatingScheduleService: EatingScheduleService) {}

  @Post(':studentId')
  async findAll(@Param('studentId') studentId: number,@Body() body: CreateEatingScheduleDto) {
    const { startDate, endDate } = body;
    return this.eatingScheduleService.findByDateRange(studentId,startDate, endDate);
  }
}
