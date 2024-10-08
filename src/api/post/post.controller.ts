import {
  Controller,
  Get,
  UseGuards,
  Req,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express/multer';

import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Req() request: any,
    @Query('page') page: number = 1,
    @Query('size') size: number = 10
  ) {
    const { id } = request.user;
    const pageNum = Number(page);
    const sizeNum = Number(size);
    return this.postService.findAll(id, pageNum, sizeNum);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Req() request: any, @Param('id') id: string) {
    const { id: userId } = request.user;
    return this.postService.findOne(userId, +id);
  }

  @Post(':id/like')
  @UseGuards(AuthGuard('jwt'))
  async toggleLike(@Req() request: any, @Param('id') postId: string) {
    const { id: userId } = request.user;
    return this.postService.toggleLike(userId, +postId);
  }

  @Post(':id/comment')
  @UseGuards(AuthGuard('jwt'))
  async commentPost(
    @Req() request: any,
    @Param('id') postId: string,
    @Body() body: any,
  ) {
    const { id: userId } = request.user;
    const { content } = body;
    return this.postService.commentPost(userId, +postId, content);
  }

  @Delete(':postId/comment/:commentId/delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteComment(
    @Req() request: any,
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
  ) {
    const { id: userId } = request.user;
    return this.postService.deleteComment(userId, +postId, +commentId);
  }

  @Put(':postId/comment/:commentId/edit')
  @UseGuards(AuthGuard('jwt'))
  async editComment(
    @Req() request: any,
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Body() body: any,
  ) {
    const { id: userId } = request.user;
    const { content } = body;
    return this.postService.editComment(userId, +postId, +commentId, content);
  }

  @Post(':id/images')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('images', 30))
  async uploadImages(
    @Req() request: any,
    @Param('id') postId: string,
    @UploadedFiles() images: any,
  ) {
    const { id: userId } = request.user;
    return this.postService.uploadImages(userId, +postId, images);
  }
}
