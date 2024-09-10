import { Controller, Post, Body, Param, Req, UseGuards, Get } from '@nestjs/common';
import { EatingScheduleService } from './eating_schedule.service';
import { CreateEatingScheduleDto } from './dto/create-eating_schedule.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('eating-schedule')
export class EatingScheduleController {
  constructor(private readonly eatingScheduleService: EatingScheduleService) {}

  @Get('students')
  @UseGuards(AuthGuard('jwt'))
  async findStudents(@Req() request: any) {
    const {id: userId} = request.user;
    return this.eatingScheduleService.findStudentByUser(userId);
  }

  @Post(':studentId')
  async findAll(@Param('studentId') studentId: number,@Body() body: CreateEatingScheduleDto) {
    const { startDate, endDate } = body;
    return this.eatingScheduleService.findByDateRange(studentId,startDate, endDate);
  }
}
