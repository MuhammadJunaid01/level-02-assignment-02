import { z } from "zod";

export const orderCreateZodSchema = z.object({
  email: z
    .string({
      required_error: "email is required field.",
      invalid_type_error: "email will be valid email",
    })
    .email(),
  productId: z
    .string({ required_error: "productId is required field." })
    .min(24, { message: "productId exact length 24 characters" })
    .max(24, { message: "productId exact length 24 characters" }),
  price: z
    .number({
      required_error: "price is required field",
      invalid_type_error: "price will be number",
    })
    .min(1, { message: "price must be greater than 0" }),
  quantity: z
    .number({
      required_error: "quantity is required field",
      invalid_type_error: "quantity will be number",
    })
    .min(1, { message: "quantity grater than 1 digit" }),
});
export const orderZodSchema = z.object({
  body: orderCreateZodSchema,
});
