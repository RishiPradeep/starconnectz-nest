import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AudiosService } from './audios.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAudioDto } from './dto/create-audio.dto';

@Controller('audios')
export class AudiosController {
  constructor(private audiosService: AudiosService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('audio'))
  async uploadAudio(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 50000000 })],
      }),
    )
    file: Express.Multer.File,
    @Body(ValidationPipe) createAudioDto: CreateAudioDto,
    @Req() request: Request,
  ) {
    return await this.audiosService.uploadAudio(
      createAudioDto,
      file.buffer,
      request,
      file,
    );
  }

  @UseGuards(AuthGuard)
  @Get('celeb/:username')
  async getCelebVideos(@Param('username') username: string, request: Request) {
    return await this.audiosService.getCelebAudios(username, request);
  }

  @UseGuards(AuthGuard)
  @Get('fan/:username')
  async getFanVideos(@Param('username') username: string, request: Request) {
    return await this.audiosService.getFanAudios(username, request);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteVideo(@Param('id', ParseIntPipe) id: number, request: Request) {
    return await this.audiosService.deleteAudio(id, request);
  }
}
