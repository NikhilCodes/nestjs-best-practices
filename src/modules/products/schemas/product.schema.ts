import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Product {
  constructor(title: string, description: string, price: number) {
    this.title = title;
    this.description = description;
    this.price = price;
  }

  public _id: Types.ObjectId | string;

  @Prop({ type: String, required: true })
  public title: string;

  @Prop({ type: String, required: true })
  public description: string;

  @Prop({ type: Number, required: false, default: 0 })
  public price: number;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
