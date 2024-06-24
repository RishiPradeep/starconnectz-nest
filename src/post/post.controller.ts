import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { DeletePostDto } from './dto/delete-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadPost(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 3000000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body(ValidationPipe) createPostDto: CreatePostDto,
  ) {
    return await this.postService.upload(createPostDto, file.buffer);
  }

  @UseGuards(AuthGuard)
  @Get(':username')
  async getCelebPosts(@Param('username') username: string) {
    return await this.postService.getCelebPosts(username);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteOnePost(@Body(ValidationPipe) deletePostDto: DeletePostDto) {
    return await this.postService.deleteOnePost(deletePostDto);
  }
}
