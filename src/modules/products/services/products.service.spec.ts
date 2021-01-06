import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../schemas/product.schema';

describe('ProductsService', () => {
  let service: ProductsService;
  let mongo_in_mem: MongoMemoryServer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
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
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    if (mongo_in_mem) await mongo_in_mem.stop();
  });
});
