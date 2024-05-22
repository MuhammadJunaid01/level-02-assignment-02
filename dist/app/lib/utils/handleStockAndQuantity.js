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
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("../../product/product.model"));
const handleStockAndQuantity = (productID, orderQuantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(productID)) {
            throw new Error("its not valid product id");
        }
        const updatedProduct = yield product_model_1.default.findOneAndUpdate({
            _id: productID,
            "inventory.inStock": { $eq: true },
        }, { $inc: { "inventory.quantity": -orderQuantity } }, { new: true });
        if (!updatedProduct) {
            throw new Error("product not found or insufficient stock.");
        }
        if (updatedProduct.inventory.quantity === 0) {
            updatedProduct.inventory.inStock = false;
            yield updatedProduct.save();
        }
        return updatedProduct;
        //eslint-disable-next-line
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error === null || error === void 0 ? void 0 : error.message);
        }
    }
});
exports.default = handleStockAndQuantity;
