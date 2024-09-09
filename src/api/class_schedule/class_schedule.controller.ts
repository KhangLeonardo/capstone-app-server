import { Controller, Post, Body, Req, UseGuards, Get, Param } from '@nestjs/common';
import { ClassScheduleService } from './class_schedule.service';
import { CreateClassScheduleDto } from './dto/create-class_schedule.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('schedule')
export class ClassScheduleController {
  constructor(private readonly classScheduleService: ClassScheduleService) {}


  @Get('students')
  @UseGuards(AuthGuard('jwt'))
  async findStudents(@Req() request: any) {
    const {id: userId} = request.user;
    return this.classScheduleService.findStudentByUser(userId);
  }

  @Post('student/:studentId')
  @UseGuards(AuthGuard('jwt'))
  async findScheduleByStudent(
    @Req() request: any,
    @Param('studentId') studentId: number,
    @Body() body: CreateClassScheduleDto
  ) {
    const {id: userId} = request.user;
    const {startDate, endDate} = body;
    return this.classScheduleService.findScheduleByStudent(
      userId,
      studentId,
      startDate,
      endDate
    )
  }

  @Get(':scheduleId')
  @UseGuards(AuthGuard('jwt'))
  async getScheduleDetail(@Param('scheduleId') scheduleId: number) {
    return this.classScheduleService.findScheduleById(scheduleId);
  }

}
