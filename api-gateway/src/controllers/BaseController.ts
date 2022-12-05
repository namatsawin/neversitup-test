import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export abstract class BaseController {
  constructor(
    @Inject('AUTH_SERVICE') protected readonly authClient: ClientProxy,
    @Inject('USER_SERVICE') protected readonly userClient: ClientProxy,
    @Inject('PRODUCT_SERVICE') protected readonly productClient: ClientProxy,
    @Inject('ORDER_SERVICE') protected readonly orderClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await Promise.all([
      this.authClient.connect(),
      this.userClient.connect(),
      this.productClient.connect(),
      this.orderClient.connect(),
    ]);
  }
}
