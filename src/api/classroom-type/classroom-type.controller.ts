import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassroomTypeService } from './classroom-type.service';
import { CreateClassroomTypeDto } from './dto/create-classroom-type.dto';
import { UpdateClassroomTypeDto } from './dto/update-classroom-type.dto';

@Controller('classroom-type')
export class ClassroomTypeController {
  constructor(private readonly classroomTypeService: ClassroomTypeService) {}

  @Post()
  create(@Body() createClassroomTypeDto: CreateClassroomTypeDto) {
    return this.classroomTypeService.create(createClassroomTypeDto);
  }

  @Get()
  findAll() {
    return this.classroomTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classroomTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassroomTypeDto: UpdateClassroomTypeDto,
  ) {
    return this.classroomTypeService.update(+id, updateClassroomTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classroomTypeService.remove(+id);
  }
}
