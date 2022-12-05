import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { throwError } from 'rxjs';

@Catch(HttpException)
export class ValidationFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch(exception: HttpException, _host: ArgumentsHost) {
    return throwError(() => exception.getResponse());
  }
}
