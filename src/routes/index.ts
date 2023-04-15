import { Application } from "express";

import productsRouter from "./api/products.route";
import categoriesRouter from "./api/categories.route";
import ordersRouter from "./api/orders.route";
import reviewsRouter from "./api/reviews.route";
import transactionsRouter from "./api/transactions.route";
import authRouter from "./api/auth.route";
import userRouter from "./api/user.route";

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get("/", (_req, res) => {
      res.send("API Running");
    });
    this.app.use("/api/products", productsRouter);
    this.app.use("/api/categories", categoriesRouter);
    this.app.use("/api/orders", ordersRouter);
    this.app.use("/api/reviews", reviewsRouter);
    this.app.use("/api/transactions", transactionsRouter);
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/user", userRouter);
  }
}

export default AppRouter;
