import { Product } from './schemas/product.schema';

export interface ProductService {
  getAll: () => Promise<Product[]>;
  insert: (
    title: string,
    description: string,
    price: number,
  ) => Promise<Product>;
}
