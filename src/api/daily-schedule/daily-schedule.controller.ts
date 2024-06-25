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
import {
  CreateDailyScheduleDto,
  UpdateDailyScheduleDto,
} from './dto/create-daily-schedule.dto';

@Controller('daily-schedules')
export class DailyScheduleController {
  constructor(private readonly dailyScheduleService: DailyScheduleService) {}

  @Post()
  create(@Body() createDailyScheduleDto: CreateDailyScheduleDto) {
    const scheduleData = {
      ...createDailyScheduleDto,
      startTime: new Date(createDailyScheduleDto.start_time),
      endTime: new Date(createDailyScheduleDto.end_time),
    };
    return this.dailyScheduleService.create(scheduleData);
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
    const scheduleData = {
      ...updateDailyScheduleDto,
      startTime: updateDailyScheduleDto.start_time
        ? new Date(updateDailyScheduleDto.start_time)
        : undefined,
      endTime: updateDailyScheduleDto.end_time
        ? new Date(updateDailyScheduleDto.end_time)
        : undefined,
    };
    return this.dailyScheduleService.update(+id, scheduleData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyScheduleService.remove(+id);
  }
}
