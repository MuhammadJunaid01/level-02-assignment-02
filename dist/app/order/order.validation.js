"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderZodSchema = exports.orderCreateZodSchema = void 0;
const zod_1 = require("zod");
exports.orderCreateZodSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "email is required field.",
        invalid_type_error: "email will be valid email",
    })
        .email(),
    productId: zod_1.z
        .string({ required_error: "productId is required field." })
        .min(24, { message: "productId exact length 24 characters" })
        .max(24, { message: "productId exact length 24 characters" }),
    price: zod_1.z
        .number({
        required_error: "price is required field",
        invalid_type_error: "price will be number",
    })
        .min(1, { message: "price must be greater than 0" }),
    quantity: zod_1.z
        .number({
        required_error: "quantity is required field",
        invalid_type_error: "quantity will be number",
    })
        .min(1, { message: "quantity grater than 1 digit" }),
});
exports.orderZodSchema = zod_1.z.object({
    body: exports.orderCreateZodSchema,
});
