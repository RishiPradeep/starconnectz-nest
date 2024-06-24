import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServicesDto } from './dto/create-service.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('service')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @UseGuards(AuthGuard)
  @Get(':username')
  async getServices(@Param('username') username: string) {
    return await this.serviceService.getServices(username);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createServices(
    @Body(ValidationPipe) createServicesDto: CreateServicesDto,
  ) {
    return await this.serviceService.createServices(createServicesDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':serviceid')
  async deleteService(@Param('serviceid', ParseIntPipe) serviceid: number) {
    return await this.serviceService.deleteService(serviceid);
  }
}
