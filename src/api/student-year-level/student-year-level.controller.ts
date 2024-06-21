import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentYearLevelService } from './student-year-level.service';
import {
  CreateStudentYearLevelDto,
  UpdateStudentYearLevelDto,
} from './dto/create-student-year-level.dto';

@Controller('student-year-levels')
export class StudentYearLevelController {
  constructor(
    private readonly studentYearLevelService: StudentYearLevelService,
  ) {}

  @Post()
  create(@Body() createStudentYearLevelDto: CreateStudentYearLevelDto) {
    return this.studentYearLevelService.create(createStudentYearLevelDto);
  }

  @Get()
  findAll() {
    return this.studentYearLevelService.findAll();
  }

  @Get(':studentId/:yearLevelId')
  findOne(
    @Param('studentId') studentId: string,
    @Param('yearLevelId') yearLevelId: string,
  ) {
    return this.studentYearLevelService.findOne(+studentId, +yearLevelId);
  }

  @Patch(':studentId/:yearLevelId')
  update(
    @Param('studentId') studentId: string,
    @Param('yearLevelId') yearLevelId: string,
    @Body() updateStudentYearLevelDto: UpdateStudentYearLevelDto,
  ) {
    return this.studentYearLevelService.update(
      +studentId,
      +yearLevelId,
      updateStudentYearLevelDto,
    );
  }

  @Delete(':studentId/:yearLevelId')
  remove(
    @Param('studentId') studentId: string,
    @Param('yearLevelId') yearLevelId: string,
  ) {
    return this.studentYearLevelService.remove(+studentId, +yearLevelId);
  }
}
