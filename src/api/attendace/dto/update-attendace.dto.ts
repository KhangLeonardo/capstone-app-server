import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendaceDto } from './create-attendace.dto';

export class UpdateAttendaceDto extends PartialType(CreateAttendaceDto) {}
