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
exports.ProductServices = exports.updatedProdcutByIDIntoDB = void 0;
const handle_errors_1 = require("../lib/utils/handle-errors");
const product_model_1 = __importDefault(require("./product.model"));
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield product_model_1.default.create(product);
        if (!product) {
            throw new Error("something went wrong.try again carefully.");
        }
        return newProduct;
    }
    catch (error) {
        throw new Error("something went wrong.try again carefully.");
    }
});
const getAllProductFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products;
        if (!searchTerm) {
            products = yield product_model_1.default.find({});
        }
        else {
            const regex = new RegExp(searchTerm, "i");
            products = yield product_model_1.default.find({
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
    }
    catch (error) {
        throw new Error("something went wrong.try again carefully.");
    }
});
const getSingleProductFromDB = (productID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.default.findById(productID);
        return product;
    }
    catch (error) {
        throw (0, handle_errors_1.createError)("product not found.", 404);
    }
});
const updatedProdcutByIDIntoDB = (productID, product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield product_model_1.default.findByIdAndUpdate(productID, product, {
            new: true,
        });
        return updatedProduct;
    }
    catch (error) {
        (0, handle_errors_1.createError)("product not found.", 404);
    }
});
exports.updatedProdcutByIDIntoDB = updatedProdcutByIDIntoDB;
const deleteProductByIDFromDB = (productID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield product_model_1.default.findByIdAndDelete(productID);
        if (!deleted) {
            throw new Error("something went wrong");
        }
        return deleted;
    }
    catch (error) {
        throw (0, handle_errors_1.createError)(error.message, 400);
    }
});
exports.ProductServices = {
    createProductIntoDB,
    getAllProductFromDB,
    getSingleProductFromDB,
    updatedProdcutByIDIntoDB: exports.updatedProdcutByIDIntoDB,
    deleteProductByIDFromDB,
};
