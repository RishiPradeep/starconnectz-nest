import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getData(celebid: number, fanid: number, serviceid: number) {
    try {
      const celeb = await this.prisma.celeb.findUnique({
        where: {
          id: celebid,
        },
      });
      if (celeb === null) {
        throw new NotFoundException(`Celeb with id ${celebid} is not found`);
      }
      const fan = await this.prisma.fan.findUnique({
        where: {
          id: fanid,
        },
      });
      if (fan === null) {
        throw new NotFoundException(`Fan with id ${fanid} is not found`);
      }
      const service = await this.prisma.service.findUnique({
        where: {
          id: serviceid,
        },
      });
      if (service === null) {
        throw new NotFoundException(
          `Service with id ${serviceid} is not found`,
        );
      }
      return { celeb, fan, service };
    } catch (error) {
      throw error;
    }
  }

  async checkIfExists(username: string): Promise<number> {
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
      }
      return celeb.id;
    } catch (error) {
      throw error;
    }
  }

  async getOrders(username: string) {
    try {
      const celebid = await this.checkIfExists(username);
      const orders = await this.prisma.order.findMany({
        where: {
          celebid: celebid,
        },
      });
      orders.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      });
      return { orders };
    } catch (error) {
      throw error;
    }
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      const { celeb, fan, service } = await this.getData(
        createOrderDto.celebid,
        createOrderDto.fanid,
        createOrderDto.serviceid,
      );
      const order = await this.prisma.order.create({
        data: {
          celebid: celeb.id,
          fanid: fan.id,
          serviceid: service.id,
          celeb_username: celeb.username,
          fan_username: fan.username,
          service_details: service.description,
          price: service.price,
        },
      });
      return { message: 'Order Created', order };
    } catch (error) {
      throw error;
    }
  }

  async deleteOrder(orderid: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderid,
      },
    });
    if (order === null) {
      throw new NotFoundException(`Order with ${orderid} not found`);
    }
    await this.prisma.order.delete({
      where: {
        id: orderid,
      },
    });
    return { message: 'Order deleted Sucessfully' };
  }

  async updateStatus(
    orderid: number,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderid,
      },
    });
    if (order === null) {
      throw new NotFoundException(`Order with id ${orderid} not found`);
    }
    await this.prisma.order.update({
      where: {
        id: orderid,
      },
      data: {
        status: updateOrderStatusDto.status,
      },
    });
    return {
      message: `Successfully updated order status of order id ${orderid} to ${updateOrderStatusDto.status}`,
    };
  }
}
