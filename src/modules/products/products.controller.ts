import { Body, Controller, Post } from '@nestjs/common';
import { Get } from '../../shared/decorators/httpMethod.decorator';
import { ProductsService } from './services/products.service';
import { ProductDto } from './products.dto';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AddRoles } from '../../shared/decorators/roles.decorator';
import { Product } from './schemas/product.schema';
import { Version } from '../../shared/decorators/versioning.decorator';

@ApiTags('products')
@ApiSecurity('x-key')
@ApiBearerAuth('authenticate')
// @Reflect.metadata('module:deprecate-all-before-version', 3)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @Version([1, 2])
  @AddRoles('user|admin')
  @ApiResponse({
    status: 200,
    description: 'Products GET request was a success.',
  })
  @ApiResponse({
    status: 401,
    description:
      "Invalid Bearer Token!, Send valid 'Bearer token' through authenticate in headers.",
  })
  @ApiResponse({
    status: 403,
    description:
      'Invalid API key! Pass a valid api key through x-key in headers.',
  })
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.getAllProducts();
  }

  @Get()
  // @Version(9)
  getTestAll() {
    return ['test', 'test1'];
  }

  @Post()
  @AddRoles('admin')
  @ApiResponse({
    status: 201,
    description: 'The Product has been successfully created.',
  })
  @ApiResponse({
    status: 401,
    description:
      "Invalid Bearer Token! Send valid 'Bearer token' through authenticate in headers.",
  })
  @ApiResponse({
    status: 403,
    description:
      'Invalid API key! Pass a valid api key through x-key in headers.',
  })
  async addProduct(@Body() productDto: ProductDto): Promise<Product> {
    return await this.productsService.insertProduct(
      productDto.title,
      productDto.desc,
      productDto.price,
    );
  }
}
