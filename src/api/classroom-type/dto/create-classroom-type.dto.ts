import { IsString, IsOptional } from 'class-validator';

export class CreateClassroomTypeDto {
  @IsString()
  typeName: string;
}

export class UpdateClassroomTypeDto {
  @IsOptional()
  @IsString()
  typeName?: string;
}
