import express from "express";
import { ProductControllers } from "./product.controller";
import { validateRequest } from "../lib/utils/validation";
import { createProductZodSchema } from "./product.validation";
const { createNewProduct, getAllPrducts, getSingleProduct } =
  ProductControllers;
const router = express.Router();
router.get("/products", getAllPrducts);
router.get("/products/:productId", getSingleProduct);
router.post(
  "/products",
  validateRequest(createProductZodSchema),
  createNewProduct
);
export { router as productRouter };
