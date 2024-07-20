import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { MedicalRequestService } from './medical-request.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateMedicalRequestDto } from './dto/create-medical-request.dto';
import { UpdateMedicalRequestDto } from './dto/update-medical-request.dto';

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

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Req() request: any,
        @Param('id') id: number,
        @Body() updateMedicalRequestDto: UpdateMedicalRequestDto
    ) {
        const user = request.user;
        const parentId = user.id;
        return this.medicalRequestService.update(parentId, id, updateMedicalRequestDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async remove(@Req() request: any, @Param('id') id: number) {
        const user = request.user;
        console.log('Authenticated user', user);
        const parentId = user.id;
        return this.medicalRequestService.remove(parentId, id);
    }
}
