import { Controller, Get, Param, UseGuards, Req, Body, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRequestDto } from './dto/create-request.dto';

@Controller('request')
export class RequestController {
    constructor(private readonly requestService: RequestService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAll(@Req() request: any) {
        const user = request.user; 
        console.log('Authenticated user', user);
        const parentId = user.id; 
        return this.requestService.findAllRequests(parentId);
    }

    @Post(':studentId')
    @UseGuards(AuthGuard('jwt'))
    async createRequest(@Req() request: any, @Body() createRequestDto: CreateRequestDto, @Param('studentId') studentId: number) {
        const user = request.user;
        const parentId = user.id;
        return this.requestService.createRequest(parentId, studentId, createRequestDto);
    }
}
