import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsNumberString()
  phone: string;
}