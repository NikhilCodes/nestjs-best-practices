import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { CronService } from './core/cron/cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CorsMiddleware } from './shared/middlewares/cors.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import TypeOrmConfigService from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ScheduleModule.forRoot(),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CronService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply Global Middlewares as given below.
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
