import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentParentService } from './student-parent.service';
import {
  CreateStudentParentDto,
  UpdateStudentParentDto,
} from './dto/create-student-parent.dto';

@Controller('student-parents')
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

  @Get(':studentId/:parent_id')
  findOne(
    @Param('studentId') studentId: string,
    @Param('parent_id') parent_id: string,
  ) {
    return this.studentParentService.findOne(+studentId, +parent_id);
  }

  @Patch(':studentId/:parent_id')
  update(
    @Param('studentId') studentId: string,
    @Param('parent_id') parent_id: string,
    @Body() updateStudentParentDto: UpdateStudentParentDto,
  ) {
    return this.studentParentService.update(
      +studentId,
      +parent_id,
      updateStudentParentDto,
    );
  }

  @Delete(':studentId/:parent_id')
  remove(
    @Param('studentId') studentId: string,
    @Param('parent_id') parent_id: string,
  ) {
    return this.studentParentService.remove(+studentId, +parent_id);
  }
}
