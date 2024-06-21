import { IsInt } from 'class-validator';

export class CreateStudentParentDto {
  @IsInt()
  studentId: number;

  @IsInt()
  guardianId: number;
}

export class UpdateStudentParentDto {
  @IsInt()
  studentId: number;

  @IsInt()
  guardianId: number;
}
