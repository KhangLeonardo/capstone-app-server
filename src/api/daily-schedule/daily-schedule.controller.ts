import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DailyScheduleService } from './daily-schedule.service';
import { CreateDailyScheduleDto } from './dto/create-daily-schedule.dto';
import { UpdateDailyScheduleDto } from './dto/update-daily-schedule.dto';

@Controller('daily-schedule')
export class DailyScheduleController {
  constructor(private readonly dailyScheduleService: DailyScheduleService) {}

  @Post()
  create(@Body() createDailyScheduleDto: CreateDailyScheduleDto) {
    return this.dailyScheduleService.create(createDailyScheduleDto);
  }

  @Get()
  findAll() {
    return this.dailyScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDailyScheduleDto: UpdateDailyScheduleDto,
  ) {
    return this.dailyScheduleService.update(+id, updateDailyScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyScheduleService.remove(+id);
  }
}
