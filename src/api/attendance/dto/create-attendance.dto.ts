import { IsInt, IsDate, IsEnum, IsOptional } from 'class-validator';
import { Status } from '../../../common/enum/status_t.enum';

export class CreateAttendanceDto {
  @IsInt()
  studentId: number;

  @IsInt()
  classId: number;

  @IsDate()
  date: Date;

  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsInt()
  absenceId?: number;
}

export class UpdateAttendanceDto {
  @IsOptional()
  @IsInt()
  studentId?: number;

  @IsOptional()
  @IsInt()
  classId?: number;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsInt()
  absenceId?: number;
}
