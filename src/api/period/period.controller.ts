import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PeriodService } from './period.service';
import { CreatePeriodDto, UpdatePeriodDto } from './dto/create-period.dto';

@Controller('periods')
export class PeriodController {
  constructor(private readonly periodService: PeriodService) {}

  @Post()
  create(@Body() createPeriodDto: CreatePeriodDto) {
    const periodData = {
      ...createPeriodDto,
      startTime: new Date(createPeriodDto.startTime),
      endTime: new Date(createPeriodDto.endTime),
    };
    return this.periodService.create(periodData);
  }

  @Get()
  findAll() {
    return this.periodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeriodDto: UpdatePeriodDto) {
    const periodData = {
      ...updatePeriodDto,
      startTime: updatePeriodDto.startTime
        ? new Date(updatePeriodDto.startTime)
        : undefined,
      endTime: updatePeriodDto.endTime
        ? new Date(updatePeriodDto.endTime)
        : undefined,
    };
    return this.periodService.update(+id, periodData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.periodService.remove(+id);
  }
}
