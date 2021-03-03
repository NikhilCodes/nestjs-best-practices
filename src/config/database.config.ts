import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      url: this.configService.get('db.mongodb.url'),
      useNewUrlParser: true,
      autoLoadEntities: true,
      synchronize: true, // [NOTE : THIS SHOULD BE FALSE ON PROD]
    };
  }
}
