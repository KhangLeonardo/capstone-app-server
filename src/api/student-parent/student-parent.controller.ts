import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentParentService } from './student-parent.service';
import { CreateStudentParentDto } from './dto/create-student-parent.dto';
import { UpdateStudentParentDto } from './dto/update-student-parent.dto';

@Controller('student-parent')
export class StudentParentController {
  constructor(private readonly studentParentService: StudentParentService) {}

  @Post()
  create(@Body() createStudentParentDto: CreateStudentParentDto) {
    return this.studentParentService.create(createStudentParentDto);
  }

  @Get()
  findAll() {
    return this.studentParentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentParentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentParentDto: UpdateStudentParentDto) {
    return this.studentParentService.update(+id, updateStudentParentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentParentService.remove(+id);
  }
}
