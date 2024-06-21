import { IsString, IsOptional, IsDate } from 'class-validator';

export class CreatePeriodDto {
  @IsString()
  name: string;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;
}

export class UpdatePeriodDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDate()
  startTime?: Date;

  @IsOptional()
  @IsDate()
  endTime?: Date;
}
