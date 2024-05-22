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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderServices = void 0;
const handle_errors_1 = require("../lib/utils/handle-errors");
const handleStockAndQuantity_1 = __importDefault(require("../lib/utils/handleStockAndQuantity"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProductQ = yield (0, handleStockAndQuantity_1.default)(order.productId, order.quantity);
        const newOrder = yield order_model_1.default.create(order);
        if (!newOrder) {
            throw new Error("Something went wrong.");
        }
        return newOrder;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const getAllOrdersFromDB = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let orders;
        if (!userEmail) {
            orders = yield order_model_1.default.find({})
                .sort({ quantity: -1 })
                .select("email productId price quantity");
        }
        else {
            orders = yield order_model_1.default.find({ email: userEmail });
        }
        if (orders.length === 0) {
            throw new Error("something went wrong");
        }
        return orders;
    }
    catch (error) {
        (0, handle_errors_1.createError)(error.message, 404);
    }
});
exports.CreateOrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
};
