import { HttpException } from '@nestjs/common';
import { ClientTCP } from '@nestjs/microservices';

export class CustomProxy extends ClientTCP {
  serializeError(err: { message: string; statusCode: number }) {
    return new HttpException(err, err.statusCode, {
      cause: new Error(err.message),
    });
  }
}
