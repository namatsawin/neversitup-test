import { Body, Controller, Post } from '@nestjs/common';
import { BaseController } from './BaseController';

@Controller('auth')
export class AuthController extends BaseController {
  @Post()
  async generateToken(@Body() body) {
    return this.authClient.send({ cmd: 'generate-token' }, body);
  }
}
