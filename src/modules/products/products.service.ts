import { Injectable, Logger } from '@nestjs/common';
import { Product } from './products.model';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

@Injectable()
export class ProductsService {
  products: Product[] = [];
  private readonly logger = new Logger('CRON-JOB');

  _getNewProductId(): string {
    return new Date().toString();
  }

  getAllProducts(): Product[] {
    return [...this.products];
  }

  insertProduct(title: string, desc: string, price: number): string {
    const newId = this._getNewProductId();
    const newProduct = new Product(newId, title, desc, price);
    this.products.push(newProduct);
    return newId;
  }
}
