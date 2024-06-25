import { IsInt, IsDate, IsEnum, IsOptional } from 'class-validator';
import { Status } from '../../../common/enum/status_t.enum';

export class CreateAttendanceDto {
  @IsInt()
  student_id: number;

  @IsInt()
  class_id: number;

  @IsDate()
  date: Date;

  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsInt()
  absence_id?: number;
}

export class UpdateAttendanceDto {
  @IsOptional()
  @IsInt()
  student_id?: number;

  @IsOptional()
  @IsInt()
  class_id?: number;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsInt()
  absence_id?: number;
}
