import { IsInt, IsDate } from 'class-validator';

export class CreateStudentYearLevelDto {
  @IsInt()
  studentId: number;

  @IsInt()
  yearLevelId: number;

  @IsInt()
  score: number;

  @IsDate()
  enrolmentDate: Date;
}

export class UpdateStudentYearLevelDto {
  @IsInt()
  studentId?: number;

  @IsInt()
  yearLevelId?: number;

  @IsInt()
  score?: number;

  @IsDate()
  enrolmentDate?: Date;
}
