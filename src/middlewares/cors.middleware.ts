import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, OPTIONS, GET, POST, DELETE',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, X-Key, Authorization',
    );
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    next();
  }
}
