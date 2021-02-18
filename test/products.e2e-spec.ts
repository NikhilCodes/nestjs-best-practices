import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductsModule } from '../src/modules/products/products.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product,
  ProductEntity,
} from '../src/modules/products/entities/product.schema';
import { ProductsService } from '../src/modules/products/products.service';
import { ProductsRepository } from '../src/core/repositories/products.repository';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;
  let productsService: ProductsService;
  let mongo_in_mem: MongoMemoryServer;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ProductsModule,
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductEntity },
        ]),
        MongooseModule.forRootAsync({
          useFactory: async () => {
            mongo_in_mem = new MongoMemoryServer();
            return {
              uri: await mongo_in_mem.getUri(),
            };
          },
        }),
      ],
      providers: [ProductsService, ProductsRepository],
    }).compile();

    app = moduleFixture.createNestApplication();
    productsService = app.get<ProductsService>(ProductsService);
    await app.init();
  });

  it('/ (GET)', async () => {
    const insertedObject = await productsService.insert('test', 'desc', 27);

    return request(app.getHttpServer())
      .get('/products/v1')
      .expect([
        {
          _id: insertedObject._id.toString(),
          title: 'test',
          description: 'desc',
          price: 27,
        },
      ]);
  });

  afterAll(async () => {
    if (mongo_in_mem) await mongo_in_mem.stop();
    await app.close();
  });
});
