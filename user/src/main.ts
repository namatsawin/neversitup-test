import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { ValidationFilter } from './filters/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new ValidationFilter());

  await app.connectMicroservice(
    {
      transport: Transport.TCP,
      options: {
        host: configService.get('HOST'),
        port: configService.get('PORT'),
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
}
bootstrap();
