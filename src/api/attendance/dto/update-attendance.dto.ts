import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceDto } from './create-attendance.dto';

export class UpdateattendanceDto extends PartialType(CreateAttendanceDto) {}
