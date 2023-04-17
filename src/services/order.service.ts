import { createError } from "../helpers/errors";
import Order from "../models/Order";
import { IOrderChange, IOrderCreate, IOrderQuery } from "../types/order.type";
import { checkOwner } from "../helpers/checkOwner";
import { ISortObject } from "../types/product.type";

export default class OrderService {
  async findAll(
    query: IOrderQuery,
    skip: number,
    limit: number,
    sort: ISortObject | undefined
  ) {
    const orderQuery = Order.find(query).sort({ createdAt: "desc" });
    if (sort) {
      orderQuery.sort(sort);
    }
    const orders = await orderQuery.skip(skip).limit(limit);
    const total = await Order.find(query).countDocuments();
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
