import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceDto } from './create-attendace.dto';

export class UpdateAttendaceDto extends PartialType(CreateAttendanceDto) {}
