import bodyParser from "body-parser";
import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import cron from "node-cron";
import { updateOrdersPerDay } from "./helpers/updateOrdersPerDay";

import AppRouter from "./routes";
import connectDB from "./config/database";
import "./config/passport";
import { handleError } from "./middlewares/handleError.middleware";

const app = express();
cron.schedule("0 0 * * *", updateOrdersPerDay);
const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(morgan(formatsLogger));
app.use(cors());
const router = new AppRouter(app);
// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 4200);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
router.init();

app.use(handleError);

const port = app.get("port");
// eslint-disable-next-line no-console
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
