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
const getAllProductFromDB = async (searchTerm: string | undefined) => {
  try {
    let products;
    if (!searchTerm) {
      products = await Product.find({});
    } else {
      const regex = new RegExp(searchTerm, "i");
      products = await Product.find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } },
          { category: { $regex: regex } },
          { tags: { $in: [regex] } },
        ],
      });
    }

    if (products.length === 0) {
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
export const updatedProdcutByIDIntoDB = async (
  productID: string,
  product: IProduct
) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productID, product, {
      new: true,
    });

    return updatedProduct;
  } catch (error) {
    createError("product not found.", 404);
  }
};
const deleteProductByIDFromDB = async (productID: string) => {
  try {
    const deleted = await Product.findByIdAndDelete(productID);
    if (!deleted) {
      throw new Error("something went wrong");
    }
    return deleted;
  } catch (error) {
    if (error instanceof Error) {
      throw createError(error.message, 400);
    }
  }
};
export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updatedProdcutByIDIntoDB,
  deleteProductByIDFromDB,
};
