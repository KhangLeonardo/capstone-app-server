import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentYearLevelDto } from './create-student-year-level.dto';

export class UpdateStudentYearLevelDto extends PartialType(
  CreateStudentYearLevelDto,
) {}
