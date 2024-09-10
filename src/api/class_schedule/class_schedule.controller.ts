import { Controller, Post, Body, Req, UseGuards, Get, Param, Query } from '@nestjs/common';
import { ClassScheduleService } from './class_schedule.service';
import { CreateClassScheduleDto } from './dto/create-class_schedule.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('class-schedule')
export class ClassScheduleController {
  constructor(private readonly classScheduleService: ClassScheduleService) {}


  @Get('students')
  @UseGuards(AuthGuard('jwt'))
  async findStudents(@Req() request: any) {
    const {id: userId} = request.user;
    return this.classScheduleService.findStudentByUser(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':studentId')
  async getSchedules(
    @Req() request: any,
    @Param('studentId') studentId: number,
    @Body('startDate') startDate: string,
    @Body('endDate') endDate: string
  ) {
    const {id: userId} = request.user;

    return this.classScheduleService.findByDateRange(
      studentId,
      startDate,
      endDate
    )
  }

}
