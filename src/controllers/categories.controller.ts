import { Request } from "express";
import CategoriesService from "../services/categories.service";
import { ICategoryCreate } from "../types/category.type";

class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  async getCategories() {
    const data = await this.categoriesService.findAll();
    return data;
  }

  async addCategory(req: Request<any, any, ICategoryCreate>) {
    const category = req.body;
    const data = await this.categoriesService.add(category);
    return data;
  }
}

const categoriesController = new CategoriesController(new CategoriesService());
export default categoriesController;
