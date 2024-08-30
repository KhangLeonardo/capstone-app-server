import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RequestStatus } from "src/common/enum/request_status.enum";
import { RequestType } from "src/common/enum/request_type.enum";
import { IsTodayOrFutureDate } from "src/common/decorators/is-today-or-future-date.decorator";

export class CreateRequestDto {
    @IsOptional()
    @IsEnum(RequestStatus)
    request_status: string; 

    @IsNotEmpty()
    @IsEnum(RequestType)
    request_type: string; 

    @IsNotEmpty()
    @IsString()
    reason: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    @IsTodayOrFutureDate()  
    start_time: Date;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    end_time: Date

}   