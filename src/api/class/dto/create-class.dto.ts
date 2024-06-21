import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class CreateClassDto {
  @IsString()
  name: string;

  @IsInt()
  subjectId: number;

  @IsInt()
  teacherId: number;

  @IsInt()
  termId: number;

  @IsInt()
  classroomId: number;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;
}

export class UpdateClassDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  subjectId?: number;

  @IsOptional()
  @IsInt()
  teacherId?: number;

  @IsOptional()
  @IsInt()
  termId?: number;

  @IsOptional()
  @IsInt()
  classroomId?: number;

  @IsOptional()
  @IsDate()
  startTime?: Date;

  @IsOptional()
  @IsDate()
  endTime?: Date;
}
