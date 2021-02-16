import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { CronService } from './core/cron/cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CorsMiddleware } from './shared/middlewares/cors.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('db.mongo.uri'),
      }),
      inject: [ConfigService],
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
