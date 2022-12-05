import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import OrderEntity from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import UserEntity from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getProfile(userId: string) {
    const profile = await this.userRepository.findOne({
      where: { id: Number(userId) },
      relations: { addresses: true },
    });
    if (!profile) {
      throw new RpcException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Profile could not be found.',
      });
    }
    return { profile };
  }

  async getHistory(userId: string) {
    const orders = await this.orderRepository.find({
      where: { id: Number(userId) },
      relations: { orderItems: true },
    });

    return { orders };
  }
}
