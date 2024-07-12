import { IsNotEmpty, IsString } from "class-validator";

export class UpdateMedicalRequestDto {
    @IsString()
    @IsNotEmpty()
    notes: string
}