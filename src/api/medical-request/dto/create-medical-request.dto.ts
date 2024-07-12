import { IsNotEmpty, IsString } from "class-validator";

export class CreateMedicalRequestDto {
    @IsString()
    @IsNotEmpty()
    notes: string
}