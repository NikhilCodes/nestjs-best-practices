import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiAuthorizationGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = ctx.switchToHttp().getRequest();
    if (
      request.headers['x-key'] === this.configService.get<string>('api.key')
    ) {
      return true;
    } else {
      throw new ForbiddenException('Invalid API key!');
    }
  }
}
