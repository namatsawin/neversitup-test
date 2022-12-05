import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IUser {
  username: string;
  email: string;
  sub: number;
  iat: number;
  exp: number;
}

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IUser;
  },
);
