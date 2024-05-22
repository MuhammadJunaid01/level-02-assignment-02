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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const mongoose_1 = __importDefault(require("mongoose"));
const handle_errors_1 = require("../lib/utils/handle-errors");
const { createProductIntoDB, getAllProductFromDB, getSingleProductFromDB, updatedProdcutByIDIntoDB, deleteProductByIDFromDB, } = product_service_1.ProductServices;
const createNewProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const newProduct = yield createProductIntoDB(product);
        if (!newProduct) {
            throw new Error("something went wrong . try again carefully");
        }
        return res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: newProduct,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllPrducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const products = yield getAllProductFromDB(searchTerm);
        if (!products) {
            throw new Error("something went wrong. try agian carefully");
        }
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: products,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
            throw (0, handle_errors_1.createError)("Invalid product ID.", 400);
        }
        const product = yield getSingleProductFromDB(productId);
        if (!product) {
            throw (0, handle_errors_1.createError)("Product not found.", 404);
        }
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: product,
        });
    }
    catch (error) {
        next(error);
    }
});
const productUpdateByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const product = req.body;
        const updatedProduct = yield updatedProdcutByIDIntoDB(productId, product);
        if (!updatedProduct) {
            throw (0, handle_errors_1.createError)("Product not found.", 404);
        }
        return res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: updatedProduct,
        });
    }
    catch (error) {
        next(error);
    }
});
const productDeleteByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productID = req.params.productId;
        if (!mongoose_1.default.Types.ObjectId.isValid(productID)) {
            throw (0, handle_errors_1.createError)("Invalid product ID.", 400);
        }
        yield deleteProductByIDFromDB(productID);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.ProductControllers = {
    createNewProduct,
    getAllPrducts,
    getSingleProduct,
    productUpdateByID,
    productDeleteByID,
};
