import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class UpdateMedicalRequestDto {
    @IsString()
    @IsNotEmpty()
    student_name: number;

    @IsString()
    @IsNotEmpty()
    notes: string
}