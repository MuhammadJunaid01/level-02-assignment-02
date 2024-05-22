import { NextFunction, Request, Response } from "express";
import { CreateOrderServices } from "./order.service";
const { createOrderIntoDB, getAllOrdersFromDB } = CreateOrderServices;
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;
    const newOrder = await createOrderIntoDB(order);
    if (newOrder) {
      return res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: newOrder,
      });
    }
  } catch (error) {
    next(error);
  }
};
const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userEmail = req.query.userEmail as string | undefined;
    const orders = await getAllOrdersFromDB(userEmail);
    if (orders && orders.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: orders,
      });
    } else {
      throw new Error("something went wrong try again.");
    }
  } catch (error) {
    next(error);
  }
};
export const CreateOrderService = {
  createOrder,
  getAllOrders,
};
