import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SchoolYearService } from './school-year.service';
import {
  CreateSchoolYearDto,
  UpdateSchoolYearDto,
} from './dto/create-school-year.dto';

@Controller('school-years')
export class SchoolYearController {
  constructor(private readonly schoolYearService: SchoolYearService) {}

  @Post()
  create(@Body() createSchoolYearDto: CreateSchoolYearDto) {
    const schoolYearData = {
      ...createSchoolYearDto,
      start_date: new Date(createSchoolYearDto.start_date),
      end_date: new Date(createSchoolYearDto.end_date),
    };
    return this.schoolYearService.create(schoolYearData);
  }

  @Get()
  findAll() {
    return this.schoolYearService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolYearService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSchoolYearDto: UpdateSchoolYearDto,
  ) {
    const schoolYearData = {
      ...updateSchoolYearDto,
      start_date: updateSchoolYearDto.start_date
        ? new Date(updateSchoolYearDto.start_date)
        : undefined,
      endDate: updateSchoolYearDto.end_date
        ? new Date(updateSchoolYearDto.end_date)
        : undefined,
    };
    return this.schoolYearService.update(+id, schoolYearData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolYearService.remove(+id);
  }
}
