import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateFanDto } from './dto/create-fan.dto';
import { UpdateFanDto } from './dto/update-fan.dto';
import { FollowCelebDto } from './dto/follow-celeb.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FanService {
  constructor(private prisma: PrismaService) {}

  checkUnique = async (
    username?: string,
    email?: string,
  ): Promise<[Boolean, String]> => {
    if (username) {
      const checkUsername = await this.prisma.fan.findUnique({
        where: {
          username: username,
        },
      });
      if (checkUsername) {
        return [true, `username-${username}`];
      }
    }
    if (email) {
      const checkEmail = await this.prisma.fan.findUnique({
        where: {
          email: email,
        },
      });
      if (checkEmail) {
        return [true, `email-${email}`];
      }
    }
    return [false, ''];
  };

  async findAll() {
    try {
      return await this.prisma.fan.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(username: string) {
    try {
      const fan = await this.prisma.fan.findUnique({
        where: {
          username,
        },
        include: {
          following: true,
          orders: true,
        },
      });
      if (fan === null) {
        throw new NotFoundException(`Fan with username ${username} not found`);
      }
      return fan;
    } catch (error) {
      throw error;
    }
  }

  async createOne(createFanDto: CreateFanDto) {
    try {
      const check = await this.checkUnique(
        createFanDto.username,
        createFanDto.email,
      );
      if (check[0]) {
        throw new ConflictException(
          `Fan with the ${check[1].split('-')[0]} ${check[1].split('-')[1]} already exists`,
        );
      }
      const salt = await bcrypt.genSalt(10);
      const fan = await this.prisma.fan.create({
        data: {
          username: createFanDto.username,
          email: createFanDto.email,
          phone: createFanDto.phone,
          password: await bcrypt.hash(createFanDto.password, salt),
        },
      });
      return { message: 'Fan Created', fan };
    } catch (error) {
      throw error;
    }
  }

  async followOne(followCelebDto: FollowCelebDto) {
    try {
      const celeb = await this.prisma.celeb.findUnique({
        where: { username: followCelebDto.celeb_username },
      });
      if (celeb === null) {
        throw new NotFoundException(
          `Celeb with username ${followCelebDto.celeb_username} is not found`,
        );
      }
      const fan = await this.prisma.fan.findUnique({
        where: {
          username: followCelebDto.fan_username,
        },
      });
      if (fan === null) {
        throw new NotFoundException(
          `Fan with username ${followCelebDto.fan_username} is not found`,
        );
      }
      await this.prisma.fan.update({
        where: {
          username: followCelebDto.fan_username,
        },
        data: {
          following: {
            connect: { id: celeb.id },
          },
        },
      });
      return {
        message: `${followCelebDto.fan_username} is now following ${followCelebDto.celeb_username}`,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateOne(username: string, updateFanDto: UpdateFanDto) {
    try {
      const fan = await this.prisma.fan.findUnique({
        where: {
          username: username,
        },
      });
      if (fan === null) {
        throw new NotFoundException(`Fan with username ${username} not found`);
      } else {
        const check = await this.checkUnique(
          updateFanDto.username,
          updateFanDto.email,
        );
        if (check[0]) {
          throw new ConflictException(
            `Celeb with the ${check[1].split('-')[0]} ${check[1].split('-')[1]} already exists`,
          );
        }
        const updatedUser = await this.prisma.fan.update({
          where: {
            username: username,
          },
          data: {
            username: updateFanDto.username || fan.username,
            email: updateFanDto.email || fan.email,
            phone: updateFanDto.phone || fan.phone,
          },
        });
        return updatedUser;
      }
    } catch (error) {
      throw error;
    }
  }

  async getFeed(username: string) {
    try {
      const fan = await this.findOne(username);
      const feed = [];
      for (const celeb of fan.following) {
        if (feed.length == 10) {
          break;
        }
        const posts = await this.prisma.post.findMany({
          where: {
            celebid: celeb.id,
          },
          orderBy: {
            created_at: 'desc',
          },
          take: 2,
        });
        feed.push(posts);
      }
      return { feed };
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(username: string) {
    try {
      const fan = await this.prisma.fan.findUnique({
        where: {
          username: username,
        },
      });
      if (fan === null) {
        throw new NotFoundException(`Fan with username ${username} not found`);
      } else {
        return await this.prisma.fan.delete({
          where: {
            username: username,
          },
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
