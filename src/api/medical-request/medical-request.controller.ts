import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { MedicalRequestService } from './medical-request.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateMedicalRequestDto } from './dto/create-medical-request.dto';

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

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Req() request: any, @Body() createMedicalRequestDto: CreateMedicalRequestDto) {
        const user = request.user;
        const parentId = user.id;
        return this.medicalRequestService.create(parentId, createMedicalRequestDto);
    }
}
