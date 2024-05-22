import { z } from "zod";

const VariantSchema = z.object({
  type: z.string({
    required_error: "variant type is required",
  }),
  value: z.string({
    required_error: "variant value is required",
  }),
});

const InventorySchema = z.object(
  {
    quantity: z.number({
      required_error: "inventory quantity is required",
      invalid_type_error: "inventory quantity must be a valid number",
    }),
    inStock: z.boolean({
      required_error: "inventory in-stock status is required",
      invalid_type_error: "inventory quantity must be true or false",
    }),
  },
  { required_error: "inventory is a required field" }
);

export const ProductZodSchema = z.object({
  name: z
    .string({ required_error: "name is a required field" })
    .min(5, { message: "name must be at least 5 characters long" })
    .max(20, { message: "name must be less than 20 characters long" }),
  description: z
    .string({ required_error: "description is a required field" })
    .min(15, { message: "description must be at least 15 characters long" })
    .max(80, { message: "description must be less than 80 characters long" }),
  price: z.number({
    required_error: "price is a required field",
    invalid_type_error: "price must be a valid number",
  }),
  category: z
    .string({
      required_error: "category is a required field",
    })
    .min(11, { message: "category must be at least 11 characters long" })
    .max(30, { message: "category must be less than 20 characters long" }),
  tags: z.array(
    z
      .string()
      .min(3, { message: "tag must be at least 3 characters long" })
      .max(15, { message: "tag must be less than 15 characters long" }),
    {
      required_error: "tags are a required field",
    }
  ),
  variants: z.array(VariantSchema, {
    required_error: "variants are a required field",
  }),
  inventory: InventorySchema,
});
export const createProductZodSchema = z.object({
  body: ProductZodSchema,
});
export const updatePrductZodSchema = z.object({
  body: ProductZodSchema,
  params: z.object({
    productId: z
      .string()
      .min(24, { message: "productId length must be 24 characters" })
      .max(24, { message: "productId length must be 24 characters" }),
  }),
});
