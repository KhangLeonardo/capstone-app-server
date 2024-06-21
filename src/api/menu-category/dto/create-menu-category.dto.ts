import { IsString, IsOptional } from 'class-validator';

export class CreateMenuCategoryDto {
  @IsString()
  name: string;
}

export class UpdateMenuCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;
}
