import { IsInt, IsOptional } from 'class-validator';

export class CreateStudentClassDto {
  @IsInt()
  studentId: number;

  @IsInt()
  classId: number;

  @IsOptional()
  @IsInt()
  score?: number;
}

export class UpdateStudentClassDto {
  @IsOptional()
  @IsInt()
  studentId?: number;

  @IsOptional()
  @IsInt()
  classId?: number;

  @IsOptional()
  @IsInt()
  score?: number;
}
