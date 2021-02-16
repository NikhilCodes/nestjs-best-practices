import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from '../../shared/types/roles.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = <Request>ctx.switchToHttp().getRequest();
    const accessSpecifiers = this.reflector.get<Role[]>(
      'roles@guard',
      ctx.getHandler(),
    );
    const bearerToken = request.headers['authorization']?.slice(7);
    const userRole = bearerToken; // No Logic devised yet! So we got with identity method
    if (
      !accessSpecifiers ||
      accessSpecifiers.some((value) => value.type === userRole)
    ) {
      return true;
    } else {
      throw new UnauthorizedException(
        "User's current role doesn't have required clearance.",
      );
    }
  }
}
