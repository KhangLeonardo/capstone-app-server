import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentYearLevelService } from './student-year-level.service';
import { CreateStudentYearLevelDto } from './dto/create-student-year-level.dto';
import { UpdateStudentYearLevelDto } from './dto/update-student-year-level.dto';

@Controller('student-year-level')
export class StudentYearLevelController {
  constructor(private readonly studentYearLevelService: StudentYearLevelService) {}

  @Post()
  create(@Body() createStudentYearLevelDto: CreateStudentYearLevelDto) {
    return this.studentYearLevelService.create(createStudentYearLevelDto);
  }

  @Get()
  findAll() {
    return this.studentYearLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentYearLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentYearLevelDto: UpdateStudentYearLevelDto) {
    return this.studentYearLevelService.update(+id, updateStudentYearLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentYearLevelService.remove(+id);
  }
}
