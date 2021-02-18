import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiAuthorizationGuard } from './core/guards/authorization.guard';
import { RolesGuard } from './core/guards/roles.guard';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';
import { DeprecatedGuard } from './core/guards/deprecated.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const reflector = app.get<Reflector>(Reflector);

  // Global prefix
  app.setGlobalPrefix('api');

  // Setting Guards
  app.useGlobalGuards(
    new ApiAuthorizationGuard(configService),
    new RolesGuard(reflector),
    new DeprecatedGuard(reflector),
  );

  // Setting Interceptors
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Swagger Documentation Init
  const options = new DocumentBuilder()
    .setTitle('Documentation | Best API')
    .setDescription('The Best API documentation')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-key', in: 'header' }, 'x-key')
    .addBearerAuth({ type: 'http', scheme: 'bearer' }, 'authenticate')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(configService.get('http.port'));
}

bootstrap().then();
