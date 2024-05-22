"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const validation_1 = require("../lib/utils/validation");
const product_validation_1 = require("./product.validation");
const { createNewProduct, getAllPrducts, getSingleProduct, productUpdateByID, productDeleteByID, } = product_controller_1.ProductControllers;
const router = express_1.default.Router();
exports.productRouter = router;
router.get("/products", getAllPrducts);
router.get("/products/:productId", getSingleProduct);
router.put("/products/:productId", (0, validation_1.validateRequest)(product_validation_1.updatePrductZodSchema), productUpdateByID);
router.delete("/products/:productId", productDeleteByID);
router.post("/products", (0, validation_1.validateRequest)(product_validation_1.createProductZodSchema), createNewProduct);
