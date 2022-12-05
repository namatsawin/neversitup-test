import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import OrderEntity from 'src/entities/order.entity';
import { Repository } from 'typeorm';

import { CreateOrderDto } from './dtos/order.dto';
import OrderItemEntity from './entities/order-item.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async getOrderList(userId: number) {
    const orders = await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: { orderItems: true },
    });

    return { orders };
  }

  async createOrder(payload: CreateOrderDto) {
    const inserted = await this.orderRepository.insert({
      user: { id: payload.userId },
    });

    const insertedOrder = inserted.generatedMaps.at(0);

    const orderItems = payload.items.map((item) =>
      this.orderItemRepository.create({
        product: { id: item.productId },
        quantity: item.quantity,
        order: { id: insertedOrder.id },
      }),
    );

    await this.orderItemRepository.insert(orderItems);

    return this.getOrderInfo(payload.userId, insertedOrder.id);
  }

  async cancelOrder(userId: number, orderId: number) {
    await this.orderRepository.update(
      {
        id: orderId,
        user: { id: userId },
      },
      { isCancaled: true },
    );
    return this.getOrderInfo(userId, orderId);
  }

  async getOrderInfo(userId: number, orderId: number) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId, user: { id: userId } },
      relations: { orderItems: { product: true } },
    });

    if (!order) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Order could not be found.',
      });
    }

    const totalPrice = order.orderItems.reduce((acc, item) => {
      acc += item.product.price * item.quantity;
      return acc;
    }, 0);

    return { order: { ...order, totalPrice } };
  }
}
