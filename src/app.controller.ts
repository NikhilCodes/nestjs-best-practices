import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('x-key')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
