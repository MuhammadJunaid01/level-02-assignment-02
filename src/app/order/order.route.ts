import express from "express";
import { validateRequest } from "../lib/utils/validation";
import { orderZodSchema } from "./order.validation";
import { CreateOrderService } from "./order.controller";
const { createOrder, getAllOrders } = CreateOrderService;
const router = express.Router();
router.get("/orders", getAllOrders);
router.post("/orders", validateRequest(orderZodSchema), createOrder);
export { router as orderRouter };
