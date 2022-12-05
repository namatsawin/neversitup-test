import { Body, Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { GenerateTokenDto } from 'src/dtos/auth.dto';
import { CreateUserDto } from 'src/dtos/user.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern({ cmd: 'verify-token' })
  async get(token: string) {
    return this.appService.verifyToken(token);
  }

  @EventPattern({ cmd: 'generate-token' })
  async generateToken(@Body() data: GenerateTokenDto) {
    return this.appService.login(data);
  }

  @EventPattern({ cmd: 'create-user' })
  async register(@Body() data: CreateUserDto) {
    return this.appService.register(data);
  }
}
