import Product from "../models/Product";
import {
  IProductCreate,
  IProduct,
  IProductChange,
} from "../types/product.type";

export default class ProductsService {
  async findAll(search: string, filter: string, skip: number, limit: number) {
    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.find().countDocuments();
    return { products, total };
  }

  async findById(_id: string) {
    const product = await Product.findOne({ _id });
    return product;
  }

  async add(product: IProductCreate) {
    const data = await Product.create(product);
    return data;
  }

  async change(id: string, data: IProductChange) {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    return product;
  }

  async delete(_id: string) {
    const product = await Product.findByIdAndRemove({ _id });
    return product;
  }
}
