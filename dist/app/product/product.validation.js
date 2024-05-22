"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePrductZodSchema = exports.createProductZodSchema = exports.ProductZodSchema = void 0;
const zod_1 = require("zod");
const VariantSchema = zod_1.z.object({
    type: zod_1.z.string({
        required_error: "variant type is required",
    }),
    value: zod_1.z.string({
        required_error: "variant value is required",
    }),
});
const InventorySchema = zod_1.z.object({
    quantity: zod_1.z.number({
        required_error: "inventory quantity is required",
        invalid_type_error: "inventory quantity must be a valid number",
    }),
    inStock: zod_1.z.boolean({
        required_error: "inventory in-stock status is required",
        invalid_type_error: "inventory quantity must be true or false",
    }),
}, { required_error: "inventory is a required field" });
exports.ProductZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "name is a required field" })
        .min(5, { message: "name must be at least 5 characters long" })
        .max(20, { message: "name must be less than 20 characters long" }),
    description: zod_1.z
        .string({ required_error: "description is a required field" })
        .min(15, { message: "description must be at least 15 characters long" })
        .max(80, { message: "description must be less than 80 characters long" }),
    price: zod_1.z.number({
        required_error: "price is a required field",
        invalid_type_error: "price must be a valid number",
    }),
    category: zod_1.z
        .string({
        required_error: "category is a required field",
    })
        .min(11, { message: "category must be at least 11 characters long" })
        .max(30, { message: "category must be less than 20 characters long" }),
    tags: zod_1.z.array(zod_1.z
        .string()
        .min(3, { message: "tag must be at least 3 characters long" })
        .max(15, { message: "tag must be less than 15 characters long" }), {
        required_error: "tags are a required field",
    }),
    variants: zod_1.z.array(VariantSchema, {
        required_error: "variants are a required field",
    }),
    inventory: InventorySchema,
});
exports.createProductZodSchema = zod_1.z.object({
    body: exports.ProductZodSchema,
});
exports.updatePrductZodSchema = zod_1.z.object({
    body: exports.ProductZodSchema,
    params: zod_1.z.object({
        productId: zod_1.z
            .string()
            .min(24, { message: "productId length must be 24 characters" })
            .max(24, { message: "productId length must be 24 characters" }),
    }),
});
