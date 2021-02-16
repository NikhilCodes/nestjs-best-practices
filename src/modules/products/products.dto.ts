import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    description: 'Name of the product',
    type: String,
  })
  title: string;

  @ApiProperty({
    description: 'Description of the product',
    type: String,
  })
  description: string;

  @ApiProperty({
    description: 'Price value of the product',
    minimum: 0,
    default: 0,
    type: Number,
  })
  price: number;
}
