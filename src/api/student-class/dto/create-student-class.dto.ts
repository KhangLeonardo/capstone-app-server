import { IsInt, IsOptional } from 'class-validator';

export class CreateStudentClassDto {
  @IsInt()
  student_id: number;

  @IsInt()
  class_id: number;

  @IsOptional()
  @IsInt()
  score?: number;
}

export class UpdateStudentClassDto {
  @IsOptional()
  @IsInt()
  student_id?: number;

  @IsOptional()
  @IsInt()
  class_id?: number;

  @IsOptional()
  @IsInt()
  score?: number;
}
