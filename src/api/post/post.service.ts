import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { Post } from '../../common/entities/post.entity';
import { ToggleLike } from '../../common/entities/toggle-like.entity';
import { Comment } from '../../common/entities/comment.entity';


import { AuthService } from '../../api/auth/auth.service';
import { Media } from 'src/common/entities/media.entity';
import { PostMedia } from 'src/common/entities/post-media.entity';
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
}
export class MediaRespone {
  id: number;
  url: string;
  type: string;
  constructor(id: number,url: string, type:string) {
    this.id = id;
    this.url = url;
    this.type = type;
  }
}
@Injectable()
export class PostService {
  private s3Client: S3Client;
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly authService: AuthService,
    @InjectRepository(ToggleLike)
    private readonly toggleLikeRepository: Repository<ToggleLike>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly configService: ConfigService,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(PostMedia)
    private readonly postMediaRepository: Repository<PostMedia>
    ) {
      const region = this.configService.get<string>('AWS_REGION');
      const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
      const secretAccessKey = this.configService.get<string>(
        'AWS_SECRET_ACCESS_KEY',
    );
    this.s3Client = new S3Client({
      region,
      credentials: {accessKeyId, secretAccessKey}
    });
    }

  private async getUserSchoolIds(userId: number): Promise<number[]> {
    const user = await this.authService.getProfile(userId);
    if (!user) {
      throw new NotFoundException(`Người dùng không tồn tại`);
    }
    return user.students.map((student) => Number(student.school_id));
  }

  private async findPostByIdAndCheckSchool(
    userId: number,
    postId: number,
  ): Promise<Post> {
    const schoolIds = await this.getUserSchoolIds(userId);
    const post = await this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.school', 'school')
      .leftJoinAndSelect('post.toggle_likes', 'toggleLikes')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('post.post_media','postMedia')
      .leftJoinAndSelect('postMedia.media', 'media')
      .where('post.id = :postId', { postId })
      .andWhere('school.id IN (:...schoolIds)', { schoolIds })
      .getOne();
    if (!post) {
      throw new NotFoundException(
        `Bài viết không tồn tại hoặc không thuộc trường học của con em bạn`,
      );
    }
    return post;
  }

  private validateFiles(files: Express.Multer.File[]): void {
    if (!files || files.length === 0) {
      throw new NotFoundException('No files uploaded');
    }
  }

  private async uploadToS3(
    post: Post,
    files: Express.Multer.File[],
  ): Promise<void> {
    const region = this.configService.get<string>('AWS_REGION');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>(
      'AWS_SECRET_ACCESS_KEY',
    );
    const bucketName = this.configService.get<string>('S3_BUCKET_NAME');

    const s3 = new S3Client({
      region,
      credentials: { accessKeyId, secretAccessKey },
    });

    const folderName = `schools/${post.school_id}/posts/${post.id}/images/`;

    const uploadPromises: Promise<any>[] = [];
    const mediaEntities: Media[] = [];

    for (const file of files) {
      const fileName = `${uuidv4()}${extname(file.originalname)}`;
      const uploadParams: PutObjectCommandInput = {
        Bucket: bucketName,
        Key: `${folderName}${fileName}`,
        Body: file.buffer,
        ACL: 'private',
      };
      uploadPromises.push(s3.send(new PutObjectCommand(uploadParams)));

      const media = new Media();
      media.url = fileName;
      media.media_type = file.mimetype,
      media.school_id = post.school_id;
      mediaEntities.push(media);
    }

    await Promise.all(uploadPromises);
    const savedMedia = await this.mediaRepository.save(mediaEntities);

    const postMediaEntities = savedMedia.map((media) => {
      const postMedia = new PostMedia();
      postMedia.post = post;
      postMedia.media = media;
      return postMedia;
    })
  }

  private async mapPostWithImages(post: Post): Promise<any> {
    if (!post) return null;
  
    const numLikes = post.toggle_likes?.length ?? 0;
    const numComments = post.comments?.length ?? 0;
    const likers = post.toggle_likes?.map((like) => like.user_id.toString()) ?? [];
  
    const media = post.post_media?.map((postMedia) => {
      const mediId = postMedia.media.id;
      const url = postMedia.media.url;
      const type  = this.getFileType(url);
      return {id: mediId,url, type};
    }) ?? [];
  
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      school_id: post.school_id,
      school_name: post.school.name,
      created_by: post.created_by,
      published_at: post.published_at,
      created_at: post.created_at,
      updated_at: post.updated_at,
      status: post.status,
      numLikes,
      numComments,
      likers,
      media
    };
  }
  
  

  async findAll(userId: number, page: number, size: number): Promise<PaginatedResponse<Post>> {
    const schoolIds = await this.getUserSchoolIds(userId);
    const skip = (page - 1) * size;
    const [posts, total] = await this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.school', 'school')
      .leftJoinAndSelect('post.toggle_likes', 'toggleLike')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('post.post_media', 'postMedia')
      .leftJoinAndSelect('postMedia.media', 'media')
      .where('school.id IN (:...schoolIds)', { schoolIds })
      .andWhere('post.status = :status', { status: 'published' })
      .skip(skip)
      .take(size)
      .getManyAndCount();
  
    const mappedPosts = await Promise.all(posts.map((post) => this.mapPostWithImages(post)));
  
    return {
      data: mappedPosts || [], 
      total: total || 0,
      page,
      size
    };
  }

  private getFileType(url: string): string {
    if (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg')) {
      return 'image';
    } else if (url.endsWith('.mp4') || url.endsWith('.avi')) {
      return 'video';
    } else {
      return 'unknown'
    }
  }
  

  async findOne(userId: number, id: number): Promise<any> {
    const post = await this.findPostByIdAndCheckSchool(userId, id);
    if (post.status !== 'published') {
      throw new NotFoundException('Bài viết không tồn tại');
    }
    const mappedPost = await this.mapPostWithImages(post);

    const comments =
      await this.commentRepository
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.user', 'user')
        .where('comment.post_id = :postId', {postId: id})
        .select([
          'comment.id',
          'comment.content',
          'comment.created_at',
          'comment.updated_at',
          'user.id',
          'user.name'
        ])
        .getMany();
    const formattedComments = comments.map(comment => ({
      id: comment.id,
      content: comment.content,
      user_id: comment.user.id,
      username: comment.user.name,
      created_at: comment.created_at,
      updated_at: comment.updated_at
    }))
    const numComments = comments.length;

    return { post: { ...mappedPost, numComments }, comments: formattedComments };
  }

  async toggleLike(
    userId: number,
    postId: number,
  ): Promise<{ status: string; message: string }> {
    const post = await this.findPostByIdAndCheckSchool(userId, postId);
    if (post.status !== 'published') {
      throw new UnauthorizedException('Bài viết không tồn tại');
    }
    const existingLike = await this.toggleLikeRepository.findOne({
      where: { user_id: userId, post_id: postId },
    });
    if (existingLike) {
      await this.toggleLikeRepository.delete({
        user_id: userId,
        post_id: postId,
      });
      return { status: 'success', message: 'Bỏ thích bài viết thành công' };
    } else {
      await this.toggleLikeRepository.save({
        user_id: userId,
        post_id: postId,
      });
      return { status: 'success', message: 'Thích bài viết thành công' };
    }
  }

  async commentPost(
    userId: number,
    postId: number,
    content: string,
  ): Promise<any> {
    const post = await this.findPostByIdAndCheckSchool(userId, postId);
    if (post.status !== 'published') {
      throw new UnauthorizedException('Bài viết không tồn tại');
    }
    const comment = new Comment();
    comment.content = content;
    comment.post = post;
    comment.user = await this.authService.getProfile(userId);
    await this.commentRepository.save(comment);
    return { status: 'success', message: 'Bình luận bài viết thành công' };
  }

  async deleteComment(
    userId: number,
    postId: number,
    commentId: number,
  ): Promise<any> {
    const post = await this.findPostByIdAndCheckSchool(userId, postId);
    if (post.status !== 'published') {
      throw new UnauthorizedException('Bài viết không tồn tại');
    }
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, post: { id: postId } },
      relations: ['user'],
    });
    if (!comment) {
      throw new NotFoundException(`Không tìm thấy bình luận`);
    }
    if (comment.user.id !== userId) {
      throw new UnauthorizedException(`Bạn không có quyền xóa bình luận này`);
    }
    await this.commentRepository.remove(comment);
    return { status: 'success', message: 'Xóa bình luận thành công' };
  }

  async editComment(
    userId: number,
    postId: number,
    commentId: number,
    content: string,
  ): Promise<any> {
    const post = await this.findPostByIdAndCheckSchool(userId, postId);
    if (post.status !== 'published') {
      throw new UnauthorizedException('Bài viết không tồn tại');
    }
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, post: { id: postId } },
      relations: ['user'],
    });
    if (!comment) {
      throw new NotFoundException(`Không tìm thấy bình luận`);
    }
    if (comment.user.id !== userId) {
      throw new UnauthorizedException(
        `Bạn không có quyền chỉnh sửa bình luận này`,
      );
    }
    comment.content = content;
    await this.commentRepository.save(comment);
    return { status: 'success', message: 'Chỉnh sửa bình luận thành công' };
  }

  async uploadImages(
    userId: number,
    postId: number,
    files: Express.Multer.File[],
  ): Promise<{ status: string; message: string }> {
    const post = await this.findPostByIdAndCheckSchool(userId, postId);

    if (!post) {
      throw new NotFoundException('Bài viết không tồn tại');
    }

    this.validateFiles(files);

    await this.uploadToS3(post, files);

    return { status: 'success', message: 'Tải lên hình ảnh thành công' };
  }
}
