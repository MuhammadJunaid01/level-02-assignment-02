import { NextFunction, Request, Response } from "express";

const createNewProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = req.body;
  res.send("hello");
};
export const ProductControllers = {
  createNewProduct,
};
