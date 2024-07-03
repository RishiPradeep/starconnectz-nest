import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import * as StreamChat from 'stream-chat';
import { ConfigService } from '@nestjs/config';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Injectable()
export class MeetingService {
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createMeeting(createMeetingDto: CreateMeetingDto, request: any) {
    try {
      if (request.user.username != createMeetingDto.celeb_username) {
        throw new UnauthorizedException(
          `This user does not have permission to access this resource`,
        );
      }
      const celeb = await this.prisma.celeb.findUnique({
        where: {
          username: createMeetingDto.celeb_username,
        },
      });
      if (celeb === null) {
        throw new NotFoundException(
          `Celeb with username ${createMeetingDto.celeb_username} not found`,
        );
      }
      const fan = await this.prisma.fan.findUnique({
        where: {
          username: createMeetingDto.fan_username,
        },
      });
      if (fan === null) {
        throw new NotFoundException(
          `Fan with username ${createMeetingDto.fan_username} not found`,
        );
      }
      const checkUniqueID = await this.prisma.meeting.findUnique({
        where: {
          call_id: createMeetingDto.call_id,
        },
      });
      if (checkUniqueID != null) {
        throw new ConflictException(`Meeting with this id already exists`);
      }
      const stream_api_key = this.configService.getOrThrow('STREAM_API_KEY');
      const stream_api_secret =
        this.configService.getOrThrow('STREAM_API_SECRET');
      const serverClient = StreamChat.StreamChat.getInstance(
        stream_api_key,
        stream_api_secret,
      );
      const token = serverClient.createToken(createMeetingDto.celeb_username);
      const meeting = await this.prisma.meeting.create({
        data: {
          celeb_username: createMeetingDto.celeb_username,
          celebid: createMeetingDto.celebid,
          fan_username: createMeetingDto.fan_username,
          fanid: createMeetingDto.fanid,
          call_id: createMeetingDto.call_id,
          celeb_token: token,
        },
      });
      return { message: 'Meeting created', meeting: meeting };
    } catch (error) {
      throw error;
    }
  }

  async getPending(fanid: number, request: any) {
    try {
      const fan = await this.prisma.fan.findUnique({
        where: {
          id: fanid,
        },
      });
      if (fan === null) {
        throw new NotFoundException(`Fan with id ${fanid} not found`);
      }
      if (fan.username != request.user.username) {
        throw new UnauthorizedException(
          'This user is not permitted to access this resource',
        );
      }
      const meetings = await this.prisma.meeting.findMany({
        where: {
          fanid: fanid,
          status: 'pending',
        },
      });
      return { meetings };
    } catch (error) {
      throw error;
    }
  }

  async updateStatus(
    meetingid: number,
    request: any,
    updateMeetingDto: UpdateMeetingDto,
  ) {
    try {
      const meeting = await this.prisma.meeting.findUnique({
        where: {
          id: meetingid,
        },
      });
      if (meeting === null) {
        throw new NotFoundException(`Meeting with id ${meeting} not found`);
      }
      if (meeting.celeb_username != request.user.username) {
        throw new UnauthorizedException(
          'This user does not have permission to access this resource',
        );
      }
      await this.prisma.meeting.update({
        where: {
          id: meetingid,
        },
        data: {
          status: updateMeetingDto.status,
        },
      });
      return {
        message: `Updated status to ${updateMeetingDto.status} successfully`,
      };
    } catch (error) {
      throw error;
    }
  }
}
