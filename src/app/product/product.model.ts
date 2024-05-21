import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";
const variantSchema = new Schema({
  type: {
    type: String,
    require: true,
  },
  value: {
    type: String,
    require: true,
  },
});
const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  variants: [variantSchema],
  inventory: {
    quantity: {
      type: Number,
    },
    inStock: {
      type: Number,
    },
  },
});
const Product = model<IProduct>("Product", productSchema);
export default Product;
