import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { AppService } from './app.service';
import { GetProductListEvent } from './dtos/product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern({ cmd: 'get-product-list' })
  getProductList(data: GetProductListEvent) {
    return this.appService.getProductList(data);
  }

  @EventPattern({ cmd: 'get-product-info' })
  getProductInfo(productId: string) {
    return this.appService.getProductInfo(productId);
  }
}
