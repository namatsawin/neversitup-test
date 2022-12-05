import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';

import { AppController } from './controllers/app.controller';
import { AuthController } from './controllers/auth.controller';
import { OrderController } from './controllers/order.controller';
import { ProductController } from './controllers/product.controller';
import { UserController } from './controllers/user.controller';
import { CustomProxy } from './custom.proxy';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [
    AppController,
    AuthController,
    UserController,
    ProductController,
    OrderController,
  ],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        console.log('host:', configService.get('AUTH_SERVICE_HOST'));
        return ClientProxyFactory.create({
          options: {
            host: configService.get('AUTH_SERVICE_HOST'),
            port: configService.get('AUTH_SERVICE_PORT'),
          },
          customClass: CustomProxy,
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          options: {
            host: configService.get('USER_SERVICE_HOST'),
            port: configService.get('USER_SERVICE_PORT'),
          },
          customClass: CustomProxy,
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'PRODUCT_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          options: {
            host: configService.get('PRODUCT_SERVICE_HOST'),
            port: configService.get('PRODUCT_SERVICE_PORT'),
          },
          customClass: CustomProxy,
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'ORDER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          options: {
            host: configService.get('ORDER_SERVICE_HOST'),
            port: configService.get('ORDER_SERVICE_PORT'),
          },
          customClass: CustomProxy,
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
