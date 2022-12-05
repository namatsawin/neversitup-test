import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, Observable, timeout } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const bearerToken: string = request.headers['authorization'];
    if (!bearerToken) return false;
    const [, token] = bearerToken.split(' ');
    if (!token) return false;

    return new Promise(async (resolve) => {
      try {
        const tokenObservable = this.client
          .send({ cmd: 'verify-token' }, token)
          .pipe(timeout(5000));
        const { user } = await lastValueFrom(tokenObservable);
        request.user = user;
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }
}
