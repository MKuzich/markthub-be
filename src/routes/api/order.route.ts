import { Router } from "express";
import auth from "../../middlewares/authValidate.middleware";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import orderController from "../../controllers/order.controller";

const orderRouter: Router = Router();

orderRouter.get(
  "/",
  auth,
  tryCatch(orderController.getOrders.bind(orderController))
);

orderRouter.get(
  "/:id",
  auth,
  tryCatch(orderController.getOrderById.bind(orderController))
);

orderRouter.post(
  "/",
  auth,
  tryCatch(orderController.addOrder.bind(orderController))
);

orderRouter.patch(
  "/:id",
  auth,
  tryCatch(orderController.changeOrder.bind(orderController))
);

export default orderRouter;
