import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const [request, response] = <[Request, Response]>ctx.getArgs();

    const now = Date.now();
    return next.handle().pipe(
      tap(
        () =>
          this.logger.debug(
            `${request.url} - ${Date.now() - now}ms - ${response.statusCode}`,
          ),
        (err: Error) =>
          this.logger.error(
            `${request.url} - ${Date.now() - now}ms - ${err.stack}`,
          ),
      ),
    );
  }
}
