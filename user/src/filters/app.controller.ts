import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern({ cmd: 'get-profile' })
  getUserInfo(userId: string) {
    return this.appService.getProfile(userId);
  }

  @EventPattern({ cmd: 'get-history' })
  getHistory(userId: string) {
    return this.appService.getHistory(userId);
  }
}
