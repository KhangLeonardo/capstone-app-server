import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateYearLevelDto {
  @IsString()
  levelName: string;

  @IsInt()
  levelOrder: number;

  @IsOptional()
  @IsInt()
  scoreRangeMin?: number;

  @IsOptional()
  @IsInt()
  scoreRangeMax?: number;

  @IsOptional()
  @IsString()
  grade?: string;
}

export class UpdateYearLevelDto {
  @IsOptional()
  @IsString()
  levelName?: string;

  @IsOptional()
  @IsInt()
  levelOrder?: number;

  @IsOptional()
  @IsInt()
  scoreRangeMin?: number;

  @IsOptional()
  @IsInt()
  scoreRangeMax?: number;

  @IsOptional()
  @IsString()
  grade?: string;
}
