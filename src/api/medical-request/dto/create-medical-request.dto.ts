import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateMedicalRequestDto {
    @IsString()
    @IsNotEmpty()
    student_name: string;

    @IsString()
    @IsNotEmpty()
    notes: string
}