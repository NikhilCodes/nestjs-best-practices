import { Product } from '../schemas/product.schema';

export interface ProductService {
  getAllProducts: () => Promise<Product[]>;
  insertProduct: (
    title: string,
    description: string,
    price: number,
  ) => Promise<Product>;
}
