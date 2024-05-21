import { z } from "zod";
import { ProductZodSchema } from "./product.validation";

export interface IProduct extends z.infer<typeof ProductZodSchema> {}
