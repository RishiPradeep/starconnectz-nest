import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CelebService } from './celeb.service';
import { CreateCelebDto } from './dto/create-celeb.dto';
import { UpdateCelebDto } from './dto/update-celeb.dto';
import { ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfilePicDto } from './dto/update-profile-pic.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ValidationGuard } from 'src/auth/validation.guard';

@Controller('celeb')
export class CelebController {
  constructor(private readonly celebService: CelebService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.celebService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':username')
  async findOne(@Param('username') username: string) {
    return await this.celebService.findOne(username);
  }

  @Post()
  async createOne(@Body(ValidationPipe) createCelebDto: CreateCelebDto) {
    return await this.celebService.createOne(createCelebDto);
  }

  @UseGuards(AuthGuard, ValidationGuard)
  @Post('updateProfilePic')
  @UseInterceptors(FileInterceptor('image'))
  async updateProfilePic(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 3000000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body(ValidationPipe) updateProfilePicDto: UpdateProfilePicDto,
  ) {
    return await this.celebService.updateProfilePic(
      updateProfilePicDto,
      file.buffer,
    );
  }

  @UseGuards(AuthGuard, ValidationGuard)
  @Patch(':username')
  async updateOne(
    @Param('username') username: string,
    @Body(ValidationPipe) updateCelebDto: UpdateCelebDto,
  ) {
    return await this.celebService.updateOne(username, updateCelebDto);
  }

  @UseGuards(AuthGuard, ValidationGuard)
  @Delete(':username')
  async deleteOne(@Param('username') username: string) {
    return await this.celebService.deleteOne(username);
  }
}
