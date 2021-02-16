import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Product,
  ProductDocument,
} from '../../modules/products/schemas/product.schema';
import { Model } from 'mongoose';
import { ProductDto } from '../../modules/products/products.dto';
import { BaseRepository } from './base/base.repository';

@Injectable()
export class ProductsRepository extends BaseRepository<Product> {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {
    super();
  }

  findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  insertOne({ title, description, price }: ProductDto): Promise<Product> {
    const createdProduct = new this.productModel({
      title,
      description,
      price,
    });
    return createdProduct.save();
  }
}
