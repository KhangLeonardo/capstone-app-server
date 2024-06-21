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
      startTime: new Date(createClassDto.startTime),
      endTime: new Date(createClassDto.endTime),
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
      startTime: updateClassDto.startTime
        ? new Date(updateClassDto.startTime)
        : undefined,
      endTime: updateClassDto.endTime
        ? new Date(updateClassDto.endTime)
        : undefined,
    };
    return this.classService.update(+id, classData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }
}
