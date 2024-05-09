import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() request: any) {
    const { id } = request.user;
    return this.postService.findAll(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Req() request: any, @Param('id') id: string) {
    const { id: userId } = request.user;
    return this.postService.findOne(userId, +id);
  }
}
