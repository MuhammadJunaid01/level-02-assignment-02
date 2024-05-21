import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects, ZodError } from "zod";

export const validateRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: "Invalid Data",
          details: error.errors.map((err) => err.message),
        });
      } else {
        next(error);
      }
    }
  };
