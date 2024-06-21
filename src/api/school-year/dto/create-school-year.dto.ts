import { IsString, IsDate } from 'class-validator';

export class CreateSchoolYearDto {
  @IsString()
  yearName: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}

export class UpdateSchoolYearDto {
  @IsString()
  yearName?: string;

  @IsDate()
  startDate?: Date;

  @IsDate()
  endDate?: Date;
}
