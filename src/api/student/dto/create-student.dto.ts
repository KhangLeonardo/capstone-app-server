import { IsString, IsEmail, IsOptional, IsDate, IsEnum } from 'class-validator';
import { Gender } from '../../.././common/enum/gender_t.enum';

export class CreateStudentDto {
  @IsString()
  givenName: string;

  @IsString()
  surname: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDate()
  dateOfBirth: Date;

  @IsOptional()
  @IsEmail()
  emailAddress?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  givenName?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsEmail()
  emailAddress?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
