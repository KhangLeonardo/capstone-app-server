import { IsString, IsDate } from 'class-validator';

export class CreateSchoolYearDto {
  @IsString()
  year: string;

  @IsDate()
  start_date: Date;

  @IsDate()
  end_date: Date;
}

export class UpdateSchoolYearDto {
  @IsString()
  year?: string;

  @IsDate()
  start_date?: Date;

  @IsDate()
  end_date?: Date;
}
