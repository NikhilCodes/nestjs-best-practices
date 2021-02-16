import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { ProductService } from './products.service.interface';
import { ProductsRepository } from '../../core/repository/products.repository';

@Injectable()
export class ProductsService implements ProductService {
  constructor(private productRepository: ProductsRepository) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async insert(
    title: string,
    description: string,
    price: number,
  ): Promise<Product> {
    return await this.productRepository.insertOne({
      title,
      description,
      price,
    });
  }
}
