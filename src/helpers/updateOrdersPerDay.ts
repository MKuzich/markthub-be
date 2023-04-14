import Product from "../models/Product";
import { createError } from "./errors";

export async function updateOrdersPerDay() {
  try {
    await Product.updateMany({}, { ordersPerDay: 0 });
  } catch (err) {
    throw createError(500, "OrdersPerDay didn't update.");
  }
}
