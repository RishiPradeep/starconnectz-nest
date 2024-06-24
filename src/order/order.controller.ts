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
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Get(':username')
  async getOrders(@Param('username') username: string) {
    return await this.orderService.getOrders(username);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createOrder(@Body(ValidationPipe) createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':orderid')
  async deleteOrder(@Param('orderid', ParseIntPipe) orderid: number) {
    return await this.orderService.deleteOrder(orderid);
  }

  @UseGuards(AuthGuard)
  @Patch(':orderid')
  async updateStatus(
    @Param('orderid', ParseIntPipe) orderid: number,
    @Body(ValidationPipe) updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return await this.orderService.updateStatus(orderid, updateOrderStatusDto);
  }
}
