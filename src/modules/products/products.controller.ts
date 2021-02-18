import { Body, Controller } from '@nestjs/common';
import { Get, Post } from '../../shared/decorators/httpMethod.decorator';
import { ProductsService } from './products.service';
import { ProductDto } from './products.dto';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AddRoles } from '../../shared/decorators/roles.decorator';
import ProductEntity from './entities/product.entity';
import {
  Deprecate,
  Version,
} from '../../shared/decorators/versioning.decorator';
import {
  ADMIN_ROLE,
  CREATOR_ROLE,
  SIMPLETON_ROLE,
} from '../../shared/types/roles.types';

@ApiTags('products')
@ApiSecurity('x-key')
@ApiBearerAuth('authenticate')
@Deprecate(1)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @Version([1, 22])
  @AddRoles([SIMPLETON_ROLE, ADMIN_ROLE])
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
  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productsService.getAll();
  }

  @Get('test')
  @Version(2)
  getTestAll() {
    return ['test', 'test1'];
  }

  @Get()
  @AddRoles([SIMPLETON_ROLE, CREATOR_ROLE])
  getTestAll_() {
    return ['test', 'test2'];
  }

  @Post()
  @Version(14)
  @AddRoles([ADMIN_ROLE])
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
  async addProduct(@Body() productDto: ProductDto): Promise<ProductEntity> {
    return await this.productsService.insert(
      productDto.title,
      productDto.description,
      productDto.price,
    );
  }
}
