import { createError } from "../helpers/errors";
import Order from "../models/Order";
import { IOrderChange, IOrderCreate } from "../types/order.type";
import { checkOwner } from "../helpers/checkOwner";

export default class OrderService {
  async findAll(
    search: string,
    filter: string,
    userId: string,
    skip: number,
    limit: number
  ) {
    const orders = Order.find().skip(skip).limit(limit);
    const total = await Order.find({ owner: userId }).countDocuments();
    return { orders, total };
  }

  async findById(id: string, userId: string) {
    const order = await Order.findById(id);
    if (!order) {
      throw createError(404, "Order not found.");
    }
    checkOwner(order, userId, "order");
    return order;
  }

  async add(owner: string, data: IOrderCreate) {
    const order = await Order.create({ ...data, owner });
    return order;
  }

  async change(userId: string, orderId: string, data: IOrderChange) {
    const order = await Order.findById(orderId);

    checkOwner(order, userId, "order");

    await Order.findByIdAndUpdate(orderId, { ...data, updatedAt: new Date() });

    return true;
  }
}
