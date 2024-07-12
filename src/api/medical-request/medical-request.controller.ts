import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MedicalRequestService } from './medical-request.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('medical-request')
export class MedicalRequestController {
    constructor (private readonly medicalRequestService: MedicalRequestService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAll(@Req() request:any) {
        const user = request.user; 
        console.log('Authenticated user', user);
        const parentId = user.id; 
        return this.medicalRequestService.findAllByParentId(parentId);
    }
}
