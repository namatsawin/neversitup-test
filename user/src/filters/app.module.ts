import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseConfig from './database.config';
import { UserEntity } from './entities/user.entity';
import AddressEntity from './entities/address.entity';
import OrderItemEntity from './entities/order-item.entity';
import OrderEntity from './entities/order.entity';
import ProductEntity from './entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(DatabaseConfig),
    TypeOrmModule.forFeature([
      UserEntity,
      AddressEntity,
      OrderEntity,
      OrderItemEntity,
      ProductEntity,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule],
})
export class AppModule {}
