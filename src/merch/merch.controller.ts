import {
  Body,
  Controller,
  Req,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
  Get,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { MerchService } from './merch.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMerchDto } from './dto/create-merch-dto';

@Controller('merch')
export class MerchController {
  constructor(private readonly merchService: MerchService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadMerch(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 15000000 }),
          new FileTypeValidator({ fileType: /\/(jpeg|png)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body(ValidationPipe) createMerchDto: CreateMerchDto,
    @Req() request: Request,
  ) {
    return await this.merchService.uploadMerch(
      createMerchDto,
      file.buffer,
      request,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':username')
  async getCelebMerch(@Param('username') username: string) {
    return await this.merchService.getCelebMerch(username);
  }

  @UseGuards(AuthGuard)
  @Delete(':merchid')
  async deleteOneMerch(
    @Param('merchid', ParseIntPipe) merchid: number,
    @Req() request: Request,
  ) {
    return await this.merchService.deleteMerch(merchid, request);
  }
}
