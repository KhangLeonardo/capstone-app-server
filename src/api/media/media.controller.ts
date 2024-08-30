import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { MediaService } from './media.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('student')
  @UseGuards(AuthGuard('jwt'))
  async findAllStudentMedias(@Req() request: any) {
    const { id: userId } = request.user;
    return this.mediaService.findAll(userId);
  }
}
