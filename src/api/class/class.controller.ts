import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto, UpdateClassDto } from './dto/create-class.dto';

@Controller('classes')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    const classData = {
      ...createClassDto,
      start_time: new Date(createClassDto.start_time),
      endTime: new Date(createClassDto.end_time),
    };
    return this.classService.create(classData);
  }

  @Get()
  findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    const classData = {
      ...updateClassDto,
      start_time: updateClassDto.start_time
        ? new Date(updateClassDto.start_time)
        : undefined,
      endTime: updateClassDto.end_time
        ? new Date(updateClassDto.end_time)
        : undefined,
    };
    return this.classService.update(+id, classData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }
}
