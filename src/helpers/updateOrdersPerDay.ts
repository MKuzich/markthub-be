import Product from "../models/Product";

export async function updateOrdersPerDay() {
  const products = await Product.find();
  products.forEach(async (product) => {
    product.ordersPerDay = 0;
    await product.save();
  });
}
