import { Application } from "express";

import productRouter from "./api/product.route";
import categoryRouter from "./api/category.route";
import orderRouter from "./api/order.route";
import reviewRouter from "./api/review.route";
import transactionRouter from "./api/transaction.route";
import authRouter from "./api/auth.route";
import userRouter from "./api/user.route";

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get("/", (_req, res) => {
      res.send("API Running");
    });
    this.app.use("/api/products", productRouter);
    this.app.use("/api/categories", categoryRouter);
    this.app.use("/api/orders", orderRouter);
    this.app.use("/api/reviews", reviewRouter);
    this.app.use("/api/transactions", transactionRouter);
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/user", userRouter);
  }
}

export default AppRouter;
