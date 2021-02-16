import { Injectable } from '@nestjs/common';
import { Product } from '../schemas/product.schema';
import { ProductService } from './products.interface';
import { ProductsRepository } from '../../../core/repository/products.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService implements ProductService {
  constructor(
    private productRepository: ProductsRepository,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async insert(
    title: string,
    description: string,
    price: number,
  ): Promise<Product> {
    return await this.productRepository.insert({
      title,
      description,
      price,
    });
  }
}
