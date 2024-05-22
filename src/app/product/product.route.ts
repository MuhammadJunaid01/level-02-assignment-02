import express from "express";
import { ProductControllers } from "./product.controller";
import { validateRequest } from "../lib/utils/validation";
import {
  createProductZodSchema,
  updatePrductZodSchema,
} from "./product.validation";
const { createNewProduct, getAllPrducts, getSingleProduct, productUpdateByID } =
  ProductControllers;
const router = express.Router();
router.get("/products", getAllPrducts);
router.get("/products/:productId", getSingleProduct);
router.put(
  "/products/:productId",
  validateRequest(updatePrductZodSchema),
  productUpdateByID
);
router.delete("/products/:productId");
router.post(
  "/products",
  validateRequest(createProductZodSchema),
  createNewProduct
);
export { router as productRouter };
