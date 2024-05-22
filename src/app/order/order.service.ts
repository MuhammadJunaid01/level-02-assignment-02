import { createError } from "../lib/utils/handle-errors";
import handleStockAndQuantity from "../lib/utils/handleStockAndQuantity";
import { IOrder } from "./order.interface";
import Order from "./order.model";

const createOrderIntoDB = async (order: IOrder) => {
  try {
    await handleStockAndQuantity(order.productId, order.quantity);

    const newOrder = await Order.create(order);
    if (!newOrder) {
      throw new Error("Something went wrong.");
    }
    return newOrder;
    //eslint-disable-next-line
  } catch (error: any) {
    throw new Error(error.message);
  }
};
const getAllOrdersFromDB = async (userEmail: string | undefined) => {
  try {
    let orders;
    if (!userEmail) {
      orders = await Order.find({})
        .sort({ quantity: -1 })
        .select("email productId price quantity");
    } else {
      orders = await Order.find({ email: userEmail })
        .sort({ quantity: -1 })
        .select("email productId price quantity");
    }

    if (orders.length === 0) {
      throw new Error("something went wrong");
    }
    return orders;
    //eslint-disable-next-line
  } catch (error: any) {
    createError(error.message, 404);
  }
};
export const CreateOrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
