import Category from "../models/Category";
import { ICategoryCreate } from "../types/category.type";

export default class CategoriesService {
  async findAll() {
    const categories = await Category.find();
    return categories;
  }

  async add(category: ICategoryCreate) {
    const createdCategory = await Category.create(category);
    return createdCategory;
  }
}
