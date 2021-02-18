import ProductEntity from './entities/product.entity';

export interface ProductService {
  getAll: () => Promise<ProductEntity[]>;
  insert: (
    title: string,
    description: string,
    price: number,
  ) => Promise<ProductEntity>;
}
