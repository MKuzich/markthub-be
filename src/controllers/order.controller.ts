import { Request } from "express";
import OrderService from "../services/order.service";
import UserService from "../services/user.service";
import ProductService from "../services/product.service";

class OrderController {
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService
  ) {}
}

const orderController = new OrderController(
  new OrderService(),
  new UserService(),
  new ProductService()
);
export default orderController;
