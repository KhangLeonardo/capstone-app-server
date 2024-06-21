import { IsString, IsDate, IsInt, IsOptional } from 'class-validator';

export class CreateClassroomDto {
  @IsDate()
  period: Date;

  @IsInt()
  classroomTypeId: number;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateClassroomDto {
  @IsOptional()
  @IsDate()
  period?: Date;

  @IsOptional()
  @IsInt()
  classroomTypeId?: number;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
