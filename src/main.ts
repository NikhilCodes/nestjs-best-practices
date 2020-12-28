import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  // Global prefix
  app.setGlobalPrefix('api');

  // Swagger Documentation Init
  const options = new DocumentBuilder()
    .setTitle('Documentation | Gigsy API')
    .setDescription('The Gigsy API documentation')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-key', in: 'header' }, 'x-key')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(configService.get('http.port'));
}

bootstrap();
