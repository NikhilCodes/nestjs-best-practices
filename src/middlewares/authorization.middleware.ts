import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: any, res: any, next: () => void) {
    if (req.headers['x-key'] === this.configService.get('api.key')) {
      next();
    } else {
      throw new UnauthorizedException('Invalid API key!');
    }
  }
}
