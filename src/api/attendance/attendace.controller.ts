import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttendaceService } from './attendace.service';
import { CreateAttendanceDto } from './dto/create-attendace.dto';
import { UpdateAttendaceDto } from './dto/update-attendace.dto';

@Controller('attendace')
export class AttendaceController {
  constructor(private readonly attendaceService: AttendaceService) {}

  @Post()
  create(@Body() createAttendaceDto: CreateAttendanceDto) {
    return this.attendaceService.create(createAttendaceDto);
  }

  @Get()
  findAll() {
    return this.attendaceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendaceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttendaceDto: UpdateAttendaceDto,
  ) {
    return this.attendaceService.update(+id, updateAttendaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendaceService.remove(+id);
  }
}
