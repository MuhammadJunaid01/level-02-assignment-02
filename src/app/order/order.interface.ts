import { z } from "zod";
import { orderCreateZodSchema } from "./order.validation";

export interface IOrder extends z.infer<typeof orderCreateZodSchema> {}
