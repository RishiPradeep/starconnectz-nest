import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Controller('meeting')
export class MeetingController {
  constructor(private meetingService: MeetingService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createMeeting(
    @Body(ValidationPipe) createMeetingDto: CreateMeetingDto,
    @Req() request: Request,
  ) {
    return await this.meetingService.createMeeting(createMeetingDto, request);
  }

  @UseGuards(AuthGuard)
  @Get('pendingMeetings/:fanid')
  async getPending(
    @Param('fanid', ParseIntPipe) fanid: number,
    @Req() request: Request,
  ) {
    return await this.meetingService.getPending(fanid, request);
  }

  @UseGuards(AuthGuard)
  @Patch(':meetingid')
  async updateStatus(
    @Param('meetingid', ParseIntPipe) meetingid: number,
    @Req() request: Request,
    @Body() updateMeetingDto: UpdateMeetingDto,
  ) {
    return await this.meetingService.updateStatus(
      meetingid,
      request,
      updateMeetingDto,
    );
  }
}
