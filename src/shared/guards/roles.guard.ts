import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = <Request>ctx.switchToHttp().getRequest();
    const accessSpecifiers = this.reflector.get<string[]>(
      'roles',
      ctx.getHandler(),
    );
    const bearerToken = request.headers['authorization']?.split(' ')[1];
    if (!accessSpecifiers || accessSpecifiers.includes(bearerToken)) {
      return true;
    } else {
      throw new UnauthorizedException('Invalid Bearer Token!');
    }
  }
}
