import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { ClassScheduleService } from './class_schedule.service';
import { CreateClassScheduleDto } from './dto/create-class_schedule.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('schedule')
export class ClassScheduleController {
  constructor(private readonly classScheduleService: ClassScheduleService) {}

  @Post('learning')
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Req() request: any, @Body() body: CreateClassScheduleDto) {
    const { id: userId } = request.user;
    const { startDate, endDate } = body;
    return this.classScheduleService.findByDateRange(
      userId,
      startDate,
      endDate,
    );
  }
}
