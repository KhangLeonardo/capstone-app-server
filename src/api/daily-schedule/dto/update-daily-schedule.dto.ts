import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyScheduleDto } from './create-daily-schedule.dto';

export class UpdateDailyScheduleDto extends PartialType(
  CreateDailyScheduleDto,
) {}
