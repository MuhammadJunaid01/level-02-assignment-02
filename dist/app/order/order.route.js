"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const validation_1 = require("../lib/utils/validation");
const order_validation_1 = require("./order.validation");
const order_controller_1 = require("./order.controller");
const { createOrder, getAllOrders } = order_controller_1.CreateOrderService;
const router = express_1.default.Router();
exports.orderRouter = router;
router.get("/orders", getAllOrders);
router.post("/orders", (0, validation_1.validateRequest)(order_validation_1.orderZodSchema), createOrder);
