import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GetProductListEvent } from './dtos/product.dto';
import ProductEntity from './entities/product.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getProductList(payload: GetProductListEvent) {
    const products = await this.productRepository.find({
      skip: (payload.page - 1) * payload.size,
      take: payload.size,
    });

    return { products };
  }

  async getProductInfo(productId: string) {
    const product = await this.productRepository.findOne({
      where: { id: Number(productId) },
    });
    if (!product) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Product could not be found.',
      });
    }
    return { product };
  }
}
