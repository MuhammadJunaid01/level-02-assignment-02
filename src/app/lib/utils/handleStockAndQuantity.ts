import mongoose from "mongoose";
import Product from "../../product/product.model";
import { createError } from "./handle-errors";

const handleStockAndQuantity = async (
  productID: string,
  orderQuantity: number
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(productID)) {
      throw new Error("its not valid product id");
    }
    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: productID,
        "inventory.inStock": { $eq: true },
      },
      { $inc: { "inventory.quantity": -orderQuantity } },
      { new: true }
    );
    if (!updatedProduct) {
      throw new Error("product not found or insufficient stock.");
    }
    if (updatedProduct.inventory.quantity === 0) {
      updatedProduct.inventory.inStock = false;
      await updatedProduct.save();
    }
    return updatedProduct;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export default handleStockAndQuantity;
