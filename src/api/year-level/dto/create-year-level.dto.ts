import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateYearLevelDto {
  @IsString()
  level_name: string;

  @IsInt()
  level_order: number;
}

export class UpdateYearLevelDto {
  @IsOptional()
  @IsString()
  level_name?: string;

  @IsOptional()
  @IsInt()
  level_order?: number;
}
