import Category from "../models/Category";
import { ICategoryCreate } from "../types/category.type";
import { createError } from "../helpers/errors";
import { Types } from "mongoose";

export default class CategoryService {
  async findAll() {
    const categories = await Category.find();
    return categories;
  }

  async findById(id: string) {
    const category = await Category.findById(id).populate("products");
    return category;
  }

  async add(category: ICategoryCreate) {
    const createdCategory = await Category.create(category);
    return createdCategory;
  }

  async addProduct(categoryId: Types.ObjectId, productId: Types.ObjectId) {
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        $push: { products: { $each: [productId], $position: 0 } },
      },
      { new: true }
    );
    if (!category) {
      throw createError(404, "Category not found.");
    }
    return true;
  }

  async deleteProduct(categoryId: Types.ObjectId, productId: Types.ObjectId) {
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        $pull: { products: productId },
      },
      { new: true }
    );
    if (!category) {
      throw createError(404, "Category not found.");
    }
    return true;
  }
}
