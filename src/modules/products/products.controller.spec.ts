import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsModule } from './products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductEntity } from './entities/product.schema';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('ProductsController', () => {
  let controller: ProductsController;
  let mongo_in_mem: MongoMemoryServer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should update data', async () => {
    await controller.addProduct({ desc: 'desc1', price: 22, title: 'test' });
    await controller.addProduct({ desc: 'desc2', price: 63, title: 'test2' });
    expect(await controller.getAllProducts()).toHaveLength(2);
  });

  afterAll(async () => {
    if (mongo_in_mem) await mongo_in_mem.stop();
  });
});
