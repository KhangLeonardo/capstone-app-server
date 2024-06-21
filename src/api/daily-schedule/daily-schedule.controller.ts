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
      startTime: new Date(createDailyScheduleDto.startTime),
      endTime: new Date(createDailyScheduleDto.endTime),
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
      startTime: updateDailyScheduleDto.startTime
        ? new Date(updateDailyScheduleDto.startTime)
        : undefined,
      endTime: updateDailyScheduleDto.endTime
        ? new Date(updateDailyScheduleDto.endTime)
        : undefined,
    };
    return this.dailyScheduleService.update(+id, scheduleData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyScheduleService.remove(+id);
  }
}
