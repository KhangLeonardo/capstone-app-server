import { IsInt, IsEnum, IsDate, IsOptional } from 'class-validator';
import { DayOfWeek } from '../../.././common/enum/day_of_week.enum';

export class CreateDailyScheduleDto {
  @IsInt()
  classId: number;

  @IsInt()
  periodId: number;

  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek;

  @IsDate()
  startTime: string;

  @IsDate()
  endTime: string;
}

export class UpdateDailyScheduleDto {
  @IsOptional()
  @IsInt()
  classId?: number;

  @IsOptional()
  @IsInt()
  periodId?: number;

  @IsOptional()
  @IsEnum(DayOfWeek)
  dayOfWeek?: DayOfWeek;

  @IsOptional()
  @IsDate()
  startTime?: string;

  @IsOptional()
  @IsDate()
  endTime?: string;
}
