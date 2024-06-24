import { Controller, UseGuards } from '@nestjs/common';
import { FanService } from './fan.service';
import { Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { CreateFanDto } from './dto/create-fan.dto';
import { UpdateFanDto } from './dto/update-fan.dto';
import { FollowCelebDto } from './dto/follow-celeb.dto';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('fan')
export class FanController {
  constructor(private readonly fanService: FanService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.fanService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':username/feed')
  async getFeed(@Param('username') username: string) {
    return await this.fanService.getFeed(username);
  }

  @UseGuards(AuthGuard)
  @Get(':username')
  async findOne(@Param('username') username: string) {
    return await this.fanService.findOne(username);
  }

  @Post()
  async createOne(@Body(ValidationPipe) createFanDto: CreateFanDto) {
    return await this.fanService.createOne(createFanDto);
  }

  @UseGuards(AuthGuard)
  @Post('follow')
  async followOne(@Body(ValidationPipe) followCelebDto: FollowCelebDto) {
    return await this.fanService.followOne(followCelebDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':username')
  async updateOne(
    @Param('username') username: string,
    @Body(ValidationPipe) updateFanDto: UpdateFanDto,
  ) {
    return await this.fanService.updateOne(username, updateFanDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':username')
  async deleteOne(@Param('username') username: string) {
    return await this.fanService.deleteOne(username);
  }
}
