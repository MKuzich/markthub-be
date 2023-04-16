import { Request } from "express";
import OrderService from "../services/order.service";
import UserService from "../services/user.service";
import ProductService from "../services/product.service";
import { IUserTokenPayload } from "../types/user.type";
import { IRequest } from "../types/request.type";
import { IOrdersQuery } from "../types/order.type";
import { buildOrderQuery } from "../helpers/buildOrderQuery";

class OrderController {
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService
  ) {}

  async getOrders(req: IRequest<any, IOrdersQuery, any, any>) {
    const { page = 1, limit = 3 } = req.query;
    const { id } = req.user as IUserTokenPayload;
    const skip = (page - 1) * limit;
    const filter = req.query;
    const query = buildOrderQuery(filter, id);
    const orders = await this.orderService.findAll(query, skip, limit);
    return orders;
  }

  async getOrderById(req: Request) {
    const { orderId } = req.params;
    const { id } = req.user as IUserTokenPayload;
    const order = await this.orderService.findById(orderId, id);
    return order;
  }

  async addOrder(req: Request) {
    const { id } = req.user as IUserTokenPayload;
    const data = req.body;
    const order = await this.orderService.add(id, data);
    await this.userService.addOrder(id, order._id);
    await this.productService.addOrder(order.products, order._id);
    return order;
  }

  async changeOrder(req: Request) {
    const { id } = req.user as IUserTokenPayload;
    const { orderId } = req.params;
    const data = req.body;
    const isChanged = await this.orderService.change(id, orderId, data);
    return isChanged;
  }
}

const orderController = new OrderController(
  new OrderService(),
  new UserService(),
  new ProductService()
);
export default orderController;
