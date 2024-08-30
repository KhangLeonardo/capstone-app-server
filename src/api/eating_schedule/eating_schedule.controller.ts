import { Controller, Post, Body } from '@nestjs/common';
import { EatingScheduleService } from './eating_schedule.service';
import { CreateEatingScheduleDto } from './dto/create-eating_schedule.dto';

@Controller('schedule')
export class EatingScheduleController {
  constructor(private readonly eatingScheduleService: EatingScheduleService) {}

  @Post('eating')
  async findAll(@Body() body: CreateEatingScheduleDto) {
    const { startDate, endDate } = body;
    return this.eatingScheduleService.findByDateRange(startDate, endDate);
  }
}
