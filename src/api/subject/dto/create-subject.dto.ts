import { IsString, IsOptional } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  subject_name: string;
}

export class UpdateSubjectDto {
  @IsOptional()
  @IsString()
  subject_name?: string;
}
