import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class VersionValidatorInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    ctx: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request: Request = ctx.switchToHttp().getRequest();
    console.log(request.params);
    return next.handle();
  }
}
