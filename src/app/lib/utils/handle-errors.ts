import { NextFunction, Request, Response } from "express";
interface CustomError extends Error {
  statusCode?: number;
}

export const createError = (message: string, statusCode: number) => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  return error;
};

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message: message,
  });
};
