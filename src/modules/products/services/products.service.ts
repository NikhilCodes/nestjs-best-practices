import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from '../schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from './products.interface';

@Injectable()
export class ProductsService implements ProductService{
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async insertProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<Product> {
    const createdProduct = new this.productModel({
      title,
      description,
      price,
    });
    return await createdProduct.save();
  }
}
