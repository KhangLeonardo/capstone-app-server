import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsInt()
  menuCategoryId: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  timeRange?: string;

  @IsOptional()
  @IsString()
  nutritionInfo?: string;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;
}

export class UpdateMenuDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  menuCategoryId?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  timeRange?: string;

  @IsOptional()
  @IsString()
  nutritionInfo?: string;

  @IsOptional()
  @IsDate()
  startTime?: Date;

  @IsOptional()
  @IsDate()
  endTime?: Date;
}
