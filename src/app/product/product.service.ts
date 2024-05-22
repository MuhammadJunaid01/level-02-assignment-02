import { createError } from "../lib/utils/handle-errors";
import { IProduct } from "./product.interface";
import Product from "./product.model";

const createProductIntoDB = async (product: IProduct) => {
  try {
    const newProduct = await Product.create(product);
    if (!product) {
      throw new Error("something went wrong.try again carefully.");
    }
    return newProduct;
  } catch (error) {
    throw new Error("something went wrong.try again carefully.");
  }
};
const getAllProductFromDB = async () => {
  try {
    const products = await Product.find({});
    if (!products) {
      throw new Error("something went wrong.try again carefully.");
    }
    return products;
  } catch (error) {
    throw new Error("something went wrong.try again carefully.");
  }
};
const getSingleProductFromDB = async (productID: string) => {
  try {
    const product = await Product.findById(productID);

    return product;
  } catch (error) {
    throw createError("product not found.", 404);
  }
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
};
