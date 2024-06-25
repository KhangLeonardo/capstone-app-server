import { IsInt, IsDate } from 'class-validator';

export class CreateTermDto {
  @IsInt()
  year_id: number;

  @IsDate()
  start_date: Date;

  @IsDate()
  end_daye: Date;

  @IsInt()
  term_number: number;
}

export class UpdateTermDto {
  @IsInt()
  year_id?: number;

  @IsDate()
  start_date?: Date;

  @IsDate()
  end_date?: Date;

  @IsInt()
  term_number?: number;
}
