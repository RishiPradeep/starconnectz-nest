import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { AddOrderDetailsDto } from './dto/add-order-info.dto';
import { RejectReasonDto } from './dto/reject-reason.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Get('getDetails/:orderid')
  async getOrderDetails(
    @Param('orderid', ParseIntPipe) orderid: number,
    @Req() request: Request,
  ) {
    return await this.orderService.getOrderDetails(orderid, request);
  }

  @UseGuards(AuthGuard)
  @Get('fan/:username')
  async getFanOrders(
    @Param('username') username: string,
    @Req() request: Request,
  ) {
    return await this.orderService.getFanOrders(username, request);
  }

  @UseGuards(AuthGuard)
  @Get('celeb/:username')
  async getCelebOrders(
    @Param('username') username: string,
    @Req() request: Request,
  ) {
    return await this.orderService.getCelebOrders(username, request);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createOrder(
    @Body(ValidationPipe) createOrderDto: CreateOrderDto,
    @Req() request: Request,
  ) {
    return await this.orderService.createOrder(createOrderDto, request);
  }

  @UseGuards(AuthGuard)
  @Delete(':orderid')
  async deleteOrder(
    @Param('orderid', ParseIntPipe) orderid: number,
    @Req() request: Request,
  ) {
    return await this.orderService.deleteOrder(orderid, request);
  }

  @UseGuards(AuthGuard)
  @Post('addDetails/:orderid')
  async addOrderDetails(
    @Param('orderid', ParseIntPipe) orderid: number,
    @Body(ValidationPipe) addOrderDetailsDto: AddOrderDetailsDto,
    @Req() request: Request,
  ) {
    return await this.orderService.addOrderDetails(
      orderid,
      addOrderDetailsDto,
      request,
    );
  }

  @UseGuards(AuthGuard)
  @Patch('rejectReason/:orderid')
  async addRejectReason(
    @Param('orderid', ParseIntPipe) orderid: number,
    @Body(ValidationPipe) rejectReasonDto: RejectReasonDto,
  ) {
    return await this.orderService.addRejectReason(orderid, rejectReasonDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':orderid')
  async updateStatus(
    @Param('orderid', ParseIntPipe) orderid: number,
    @Body(ValidationPipe) updateOrderStatusDto: UpdateOrderStatusDto,
    @Req() request: Request,
  ) {
    return await this.orderService.updateStatus(
      orderid,
      updateOrderStatusDto,
      request,
    );
  }
}
