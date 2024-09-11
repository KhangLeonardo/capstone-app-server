import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RequestStatus } from "src/common/enum/request_status.enum";
import { RequestType } from "src/common/enum/request_type.enum";

export class CreateRequestDto {
    @IsOptional()
    @IsEnum(RequestStatus)
    request_status: string = RequestStatus.pending;

    @IsNotEmpty()
    @IsEnum(RequestType)
    request_type: string;

    @IsNotEmpty()
    @IsString()
    reason: string;

    @IsOptional()
    @IsString()
    note: string;

    @IsOptional()
    @IsString()
    description: string;
}
