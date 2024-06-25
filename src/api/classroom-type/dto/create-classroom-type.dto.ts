import { IsString, IsOptional } from 'class-validator';

export class CreateClassroomTypeDto {
  @IsString()
  name: string;
}

export class UpdateClassroomTypeDto {
  @IsOptional()
  @IsString()
  name?: string;
}
