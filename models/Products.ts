import { Schema, model, models, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description?: string;
  price: number;
  images?: string[];
}

const ProductSchema:Schema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  images: [String]
});

export const Product = models.Product || model<IProduct>('Product', ProductSchema);
