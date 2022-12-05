import { Controller, Get, Query, Param } from '@nestjs/common';
import { BaseController } from './BaseController';

@Controller('product')
export class ProductController extends BaseController {
  @Get()
  async getProductList(@Query() query) {
    return this.productClient.send({ cmd: 'get-product-list' }, query);
  }

  @Get(':productId')
  async getProductInfo(@Param('productId') productId) {
    return this.productClient.send({ cmd: 'get-product-info' }, productId);
  }
}
