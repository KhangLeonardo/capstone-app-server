import { IsInt, IsEnum, IsDate, IsOptional } from 'class-validator';
import { DayOfWeek } from '../../.././common/enum/day_of_week.enum';

export class CreateDailyScheduleDto {
  @IsInt()
  class_id: number;

  @IsInt()
  period_id: number;

  @IsEnum(DayOfWeek)
  day_of_week: DayOfWeek;

  @IsDate()
  start_time: Date;

  @IsDate()
  end_time: Date;
}

export class UpdateDailyScheduleDto {
  @IsOptional()
  @IsInt()
  class_id?: number;

  @IsOptional()
  @IsInt()
  period_id?: number;

  @IsOptional()
  @IsEnum(DayOfWeek)
  day_of_week?: DayOfWeek;

  @IsOptional()
  @IsDate()
  start_time?: Date;

  @IsOptional()
  @IsDate()
  end_time?: Date;
}
