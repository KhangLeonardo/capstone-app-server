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

  @Get(':studentId/:parentId')
  findOne(
    @Param('studentId') studentId: string,
    @Param('parentId') parentId: string,
  ) {
    return this.studentParentService.findOne(+studentId, +parentId);
  }

  @Patch(':studentId/:parentId')
  update(
    @Param('studentId') studentId: string,
    @Param('parentId') parentId: string,
    @Body() updateStudentParentDto: UpdateStudentParentDto,
  ) {
    return this.studentParentService.update(
      +studentId,
      +parentId,
      updateStudentParentDto,
    );
  }

  @Delete(':studentId/:parentId')
  remove(
    @Param('studentId') studentId: string,
    @Param('parentId') parentId: string,
  ) {
    return this.studentParentService.remove(+studentId, +parentId);
  }
}
