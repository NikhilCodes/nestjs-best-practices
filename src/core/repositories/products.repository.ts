import ProductEntity from '../../modules/products/entities/product.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ProductDto } from '../../modules/products/products.dto';

@EntityRepository(ProductEntity)
export class ProductsRepository extends Repository<ProductEntity> {
  findAll(): Promise<ProductEntity[]> {
    return this.find({});
  }

  insertOne(entity: ProductDto): Promise<ProductEntity> {
    return this.save(entity);
  }
}
