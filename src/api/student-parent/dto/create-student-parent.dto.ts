import { IsInt } from 'class-validator';

export class CreateStudentParentDto {
  @IsInt()
  student_id: number;

  @IsInt()
  parent_id: number;
}

export class UpdateStudentParentDto {
  @IsInt()
  student_id: number;

  @IsInt()
  parent_id: number;
}
