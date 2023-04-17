import { Router } from "express";
import auth from "../../middlewares/authValidate.middleware";
import { tryCatch } from "../../middlewares/tryCatch.middleware";
import orderController from "../../controllers/order.controller";
import { validateRequest } from "../../middlewares/validateRequest.middleware";
import { createOrderSchema, changeOrderSchema } from "../../models/Order";

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
  validateRequest(createOrderSchema),
  tryCatch(orderController.addOrder.bind(orderController))
);

orderRouter.patch(
  "/:id",
  auth,
  validateRequest(changeOrderSchema),
  tryCatch(orderController.changeOrder.bind(orderController))
);

export default orderRouter;
