import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';
import { ProductDto } from './products.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@ApiSecurity('x-key')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAllProducts();
  }

  @Post()
  addProduct(@Body() productDto: ProductDto): { id: string } {
    const generatedId = this.productsService.insertProduct(
      productDto.title,
      productDto.desc,
      productDto.price,
    );
    return {
      id: generatedId,
    };
  }
}
