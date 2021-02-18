import { Injectable } from '@nestjs/common';
import ProductEntity from './entities/product.entity';
import { ProductService } from './products.service.interface';
import { ProductsRepository } from '../../core/repositories/products.repository';

@Injectable()
export class ProductsService implements ProductService {
  constructor(private productRepository: ProductsRepository) {}

  getAll(): Promise<ProductEntity[]> {
    return this.productRepository.findAll();
  }

  insert(
    title: string,
    description: string,
    price: number,
  ): Promise<ProductEntity> {
    return this.productRepository.insertOne({
      title,
      description,
      price,
    });
  }
}
