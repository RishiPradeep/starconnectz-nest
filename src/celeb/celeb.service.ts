import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCelebDto } from './dto/create-celeb.dto';
import { ConfigService } from '@nestjs/config';
import { UpdateCelebDto } from './dto/update-celeb.dto';
import { UpdateProfilePicDto } from './dto/update-profile-pic.dto';
import * as sharp from 'sharp';
import * as bcrypt from 'bcrypt';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Request } from 'express';

@Injectable()
export class CelebService {
  private readonly s3Client: S3Client;

  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: this.configService.getOrThrow('ACCESS_KEY'),
        secretAccessKey: this.configService.getOrThrow('SECRET_ACCESS_KEY'),
      },
      region: this.configService.getOrThrow('BUCKET_REGION'),
    });
  }

  async checkUnique(
    username?: string,
    email?: string,
  ): Promise<[Boolean, String]> {
    if (username) {
      const checkUsername = await this.prisma.celeb.findUnique({
        where: {
          username: username,
        },
      });
      if (checkUsername) {
        return [true, `username-${username}`];
      }
    }
    if (email) {
      const checkEmail = await this.prisma.celeb.findUnique({
        where: {
          email: email,
        },
      });
      if (checkEmail) {
        return [true, `email-${email}`];
      }
    }
    return [false, ''];
  }

  async findAll() {
    try {
      return await this.prisma.celeb.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findOne(username: string) {
    try {
      const celeb = await this.prisma.celeb.findUnique({
        where: {
          username,
        },
      });
      if (celeb === null) {
        throw new NotFoundException(
          `Celeb with username ${username} not found`,
        );
      }
      return celeb;
    } catch (error) {
      throw error;
    }
  }

  async createOne(createCelebDto: CreateCelebDto) {
    try {
      const check = await this.checkUnique(
        createCelebDto.username,
        createCelebDto.email,
      );
      if (check[0]) {
        throw new ConflictException(
          `Celeb with the ${check[1].split('-')[0]} ${check[1].split('-')[1]} already exists`,
        );
      }
      const salt = await bcrypt.genSalt(10);
      const celeb = await this.prisma.celeb.create({
        data: {
          username: createCelebDto.username,
          email: createCelebDto.email,
          socials: createCelebDto.socials,
          password: await bcrypt.hash(createCelebDto.password, salt),
        },
      });
      return { message: 'Celeb Created', celeb };
    } catch (error) {
      throw error;
    }
  }

  async updateOne(username: string, updateCelebDto: UpdateCelebDto) {
    try {
      const celeb = await this.prisma.celeb.findUnique({
        where: {
          username: username,
        },
      });
      if (celeb === null) {
        throw new NotFoundException(
          `Celeb with username ${username} not found`,
        );
      } else {
        const check = await this.checkUnique(
          updateCelebDto.username,
          updateCelebDto.email,
        );
        if (check[0]) {
          throw new ConflictException(
            `Celeb with the ${check[1].split('-')[0]} ${check[1].split('-')[1]} already exists`,
          );
        }
        const updatedUser = await this.prisma.celeb.update({
          where: {
            username: username,
          },
          data: {
            bio: updateCelebDto.bio || celeb.bio,
            username: updateCelebDto.username || celeb.username,
            email: updateCelebDto.email || celeb.email,
            socials: updateCelebDto.socials || celeb.socials,
          },
        });
        return updatedUser;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateProfilePic(
    updateProfilePicDto: UpdateProfilePicDto,
    file: Buffer,
    request: any,
  ) {
    try {
      if (request.user.username != updateProfilePicDto.username) {
        throw new UnauthorizedException(
          'This user does not have permission to modify this resource',
        );
      }
      const check = await this.prisma.celeb.findUnique({
        where: {
          username: updateProfilePicDto.username,
        },
      });
      if (check === null) {
        throw new NotFoundException(
          `Celeb with username ${updateProfilePicDto.username} not found`,
        );
      }
      const newBuffer = await sharp(file)
        .resize({ height: 320, width: 320, fit: 'contain' })
        .toBuffer();
      const bucketName = await this.configService.getOrThrow(
        'PROFILE_PIC_BUCKET_NAME',
      );
      const imageName = `${check.username}-profile-pic`;
      const imageUrl = `https://${bucketName}.s3.amazonaws.com/${imageName}`;
      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: newBuffer,
        ContentType: 'image/jpeg',
      };
      const command = new PutObjectCommand(params);
      await this.s3Client.send(command);
      await this.prisma.celeb.update({
        where: {
          id: check.id,
        },
        data: {
          profile_pic: imageUrl,
        },
      });
      return { message: 'Profile Pic Updated' };
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(username: string) {
    try {
      const celeb = await this.prisma.celeb.findUnique({
        where: {
          username: username,
        },
      });
      if (celeb === null) {
        throw new NotFoundException(
          `Celeb with username ${username} not found`,
        );
      } else {
        const deletedCeleb = await this.prisma.celeb.delete({
          where: {
            id: celeb.id,
          },
        });
        return { message: 'Celeb deleted', deletedCeleb };
      }
    } catch (error) {
      throw error;
    }
  }
}
