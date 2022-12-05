import { Body, Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import {
  CancelOrderDto,
  CreateOrderDto,
  GetOrderInfoDto,
} from './dtos/order.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern({ cmd: 'get-order-list' })
  getOrderList(userId: number) {
    return this.appService.getOrderList(userId);
  }

  @EventPattern({ cmd: 'get-order-info' })
  getOrderInfo(@Body() data: GetOrderInfoDto) {
    return this.appService.getOrderInfo(data.userId, data.orderId);
  }

  @EventPattern({ cmd: 'create-order' })
  createOrder(@Body() data: CreateOrderDto) {
    return this.appService.createOrder(data);
  }

  @EventPattern({ cmd: 'cancel-order' })
  cancelOrder(@Body() data: CancelOrderDto) {
    return this.appService.cancelOrder(data.userId, data.orderId);
  }
}
