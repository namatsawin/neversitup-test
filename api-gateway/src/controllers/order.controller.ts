import {
  Controller,
  Get,
  Param,
  UseGuards,
  Patch,
  Post,
  Body,
} from '@nestjs/common';
import { IUser, User } from 'src/decorators/user.dectorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { BaseController } from './BaseController';

@Controller('order')
export class OrderController extends BaseController {
  @Get()
  @UseGuards(AuthGuard)
  getOrderList(@User() user: IUser) {
    return this.orderClient.send({ cmd: 'get-order-list' }, user.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getOrderInfo(@Param('id') id, @User() user: IUser) {
    return this.orderClient.send(
      { cmd: 'get-order-info' },
      { userId: user.sub, orderId: id },
    );
  }

  @Post()
  @UseGuards(AuthGuard)
  createOrder(@User() user: IUser, @Body() body) {
    return this.orderClient.send(
      { cmd: 'create-order' },
      { userId: user.sub, ...body },
    );
  }

  @Patch(':id/cancel')
  @UseGuards(AuthGuard)
  cancelOrder(@Param('id') id, @User() user: IUser) {
    return this.orderClient.send(
      { cmd: 'cancel-order' },
      { userId: user.sub, orderId: id },
    );
  }
}
