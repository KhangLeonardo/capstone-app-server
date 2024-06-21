import { IsInt, IsDate } from 'class-validator';

export class CreateTermDto {
  @IsInt()
  yearId: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsInt()
  termNumber: number;
}

export class UpdateTermDto {
  @IsInt()
  yearId?: number;

  @IsDate()
  startDate?: Date;

  @IsDate()
  endDate?: Date;

  @IsInt()
  termNumber?: number;
}
