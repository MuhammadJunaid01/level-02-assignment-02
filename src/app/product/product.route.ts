import express from "express";
import { ProductControllers } from "./product.controller";
import { validateRequest } from "../lib/utils/validation";
import { ProductZodSchema, createProductZodSchema } from "./product.validation";
const { createNewProduct } = ProductControllers;
const router = express.Router();
router.post(
  "/products",
  validateRequest(createProductZodSchema),
  createNewProduct
);
export { router as productRouter };
