import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateMealDto {
  @IsInt()
  menuId: number;

  @IsString()
  mealName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  nutritionInfo?: string;
}

export class UpdateMealDto {
  @IsOptional()
  @IsInt()
  menuId?: number;

  @IsOptional()
  @IsString()
  mealName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  nutritionInfo?: string;
}
