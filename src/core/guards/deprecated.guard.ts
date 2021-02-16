import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotAcceptableException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DEPRECATED_VERSION_METADATA_KEY } from '../../shared/decorators/versioning.decorator';

@Injectable()
export class DeprecatedGuard implements CanActivate {
  versionRegex = new RegExp('/v[0-9]+/?');

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const deprecateVersion =
      this.reflector.get<number>(
        DEPRECATED_VERSION_METADATA_KEY,
        context.getClass(),
      ) ?? 0;

    const requestUrl = context.switchToHttp().getRequest().route.path;

    const versionFromUrl = this.parseVersionNumberFromSubRouteVersion(
      requestUrl.match(this.versionRegex)?.[0] ?? '/v1',
    );

    if (versionFromUrl > deprecateVersion) {
      return true;
    } else {
      throw new NotAcceptableException(
        `Use version[>${deprecateVersion}] to dodge this exception.`,
        'Deprecated',
      );
    }
  }

  parseVersionNumberFromSubRouteVersion(dirtySubRoute: string): number {
    return parseInt(
      dirtySubRoute.endsWith('/')
        ? dirtySubRoute.slice(2, -1)
        : dirtySubRoute.slice(2),
    );
  }
}
