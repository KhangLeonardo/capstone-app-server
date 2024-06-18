import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { YearLevelService } from './year-level.service';
import { CreateYearLevelDto } from './dto/create-year-level.dto';
import { UpdateYearLevelDto } from './dto/update-year-level.dto';

@Controller('year-level')
export class YearLevelController {
  constructor(private readonly yearLevelService: YearLevelService) {}

  @Post()
  create(@Body() createYearLevelDto: CreateYearLevelDto) {
    return this.yearLevelService.create(createYearLevelDto);
  }

  @Get()
  findAll() {
    return this.yearLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.yearLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateYearLevelDto: UpdateYearLevelDto) {
    return this.yearLevelService.update(+id, updateYearLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yearLevelService.remove(+id);
  }
}
