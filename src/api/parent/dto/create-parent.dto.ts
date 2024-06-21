import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

export class CreateParentDto {
  @IsString()
  givenName: string;

  @IsString()
  surname: string;

  @IsOptional()
  @IsEmail()
  emailAddress?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsInt()
  parentTypeId: number;
}

export class UpdateParentDto {
  @IsOptional()
  @IsString()
  givenName?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsEmail()
  emailAddress?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsInt()
  parentTypeId?: number;
}
