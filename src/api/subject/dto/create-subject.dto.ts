import { IsString, IsOptional } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  subjectName: string;
}

export class UpdateSubjectDto {
  @IsOptional()
  @IsString()
  subjectName?: string;
}
