import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from './entities/user.entity';

export const DatabaseConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      // autoLoadEntities: true,
      entities: [UserEntity],

      // Database connection
      type: 'postgres',
      host: configService.get('DB_HOST'),
      database: configService.get('DB_NAME'),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      port: configService.get('DB_PORT'),
      retryAttempts: 10,
      retryDelay: 3000,

      // To synchronize entities with a database.
      synchronize: true,
    };
  },
};

export default DatabaseConfig;
