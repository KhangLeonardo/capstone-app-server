import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class CreateClassDto {
  @IsString()
  name: string;

  @IsInt()
  subject_id: number;

  @IsInt()
  teacher_id: number;

  @IsInt()
  term_id: number;

  @IsInt()
  classroom_id: number;

  @IsDate()
  start_time: Date;

  @IsDate()
  end_time: Date;
}

export class UpdateClassDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  subject_id?: number;

  @IsOptional()
  @IsInt()
  teacher_id?: number;

  @IsOptional()
  @IsInt()
  term_id?: number;

  @IsOptional()
  @IsInt()
  classroom_id?: number;

  @IsOptional()
  @IsDate()
  start_time?: Date;

  @IsOptional()
  @IsDate()
  end_time?: Date;
}
