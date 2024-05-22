import { createError } from "../lib/utils/handle-errors";
import handleStockAndQuantity from "../lib/utils/handleStockAndQuantity";
import { IOrder } from "./order.interface";
import Order from "./order.model";

const createOrderIntoDB = async (order: IOrder) => {
  try {
    const updatedProductQ = await handleStockAndQuantity(
      order.productId,
      order.quantity
    );

    const newOrder = await Order.create(order);
    if (!newOrder) {
      throw new Error("Something went wrong.");
    }
    return newOrder;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
const getAllOrdersFromDB = async () => {
  try {
    const orders = await Order.find({});
    if (orders.length === 0) {
      throw new Error("something went wrong");
    }
    return orders;
  } catch (error: any) {
    createError(error.message, 404);
  }
};
export const CreateOrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
