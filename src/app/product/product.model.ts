import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";
const variantSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);
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
      type: Boolean,
    },
  },
});
const Product = model<IProduct>("Product", productSchema);
export default Product;
