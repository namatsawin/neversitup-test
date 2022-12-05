import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { IUser, User } from 'src/decorators/user.dectorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { BaseController } from './BaseController';

@Controller('user')
export class UserController extends BaseController {
  @Get()
  @UseGuards(AuthGuard)
  getUser(@User() user: IUser) {
    return this.userClient.send({ cmd: 'get-profile' }, user.sub);
  }

  @Post()
  create(@Body() body) {
    return this.authClient.send({ cmd: 'create-user' }, body);
  }
}
