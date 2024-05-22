import { Schema, Types, model } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      ref: "Product",
      required: true,
      trim: true,
    },
    productId: {
      type: String,
      ref: "Product",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Order = model<IOrder>("Order", orderSchema);
export default Order;
