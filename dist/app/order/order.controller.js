"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderService = void 0;
const order_service_1 = require("./order.service");
const { createOrderIntoDB, getAllOrdersFromDB } = order_service_1.CreateOrderServices;
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const newOrder = yield createOrderIntoDB(order);
        if (newOrder) {
            return res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: newOrder,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.query.userEmail;
        const orders = yield getAllOrdersFromDB(userEmail);
        if (orders && orders.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: orders,
            });
        }
        else {
            throw new Error("something went wrong try again.");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.CreateOrderService = {
    createOrder,
    getAllOrders,
};
