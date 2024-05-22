import { NextFunction, Request, Response } from "express";
import { ProductServices } from "./product.service";
import mongoose from "mongoose";
import { createError } from "../lib/utils/handle-errors";
const {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updatedProdcutByIDIntoDB,
} = ProductServices;
const createNewProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body;
    const newProduct = await createProductIntoDB(product);
    if (!newProduct) {
      throw new Error("something went wrong . try again carefully");
    }
    return res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};
const getAllPrducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAllProductFromDB();
    if (!products) {
      throw new Error("something went wrong. try agian carefully");
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw createError("Invalid product ID.", 400);
    }
    const product = await getSingleProductFromDB(productId);
    if (!product) {
      throw createError("Product not found.", 404);
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
const productUpdateByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId;
    const product = req.body;
    const updatedProduct = await updatedProdcutByIDIntoDB(productId, product);
    if (!updatedProduct) {
      throw createError("Product not found.", 404);
    }
    return res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const ProductControllers = {
  createNewProduct,
  getAllPrducts,
  getSingleProduct,
  productUpdateByID,
};
