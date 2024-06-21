import { IsString, IsInt, IsOptional, IsDate, IsEnum } from 'class-validator';
import { Gender } from '../../.././common/enum/gender_t.enum';

export class CreateTeacherDto {
  @IsString()
  givenName: string;

  @IsString()
  surname: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsDate()
  dateOfBirth: Date;
}

export class UpdateTeacherDto {
  @IsOptional()
  @IsString()
  givenName?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;
}
