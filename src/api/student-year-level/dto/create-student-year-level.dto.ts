import { IsInt, IsDate } from 'class-validator';

export class CreateStudentYearLevelDto {
  @IsInt()
  student_id: number;

  @IsInt()
  year_level_id: number;

  @IsInt()
  score: number;

  @IsDate()
  enrolment_date: Date;
}

export class UpdateStudentYearLevelDto {
  @IsInt()
  student_id?: number;

  @IsInt()
  year_level_id?: number;

  @IsInt()
  score?: number;

  @IsDate()
  enrolment_date?: Date;
}
