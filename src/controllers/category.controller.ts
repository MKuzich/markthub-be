import { Request } from "express";
import CategoryService from "../services/category.service";
import { ICategoryCreate } from "../types/category.type";

class CategoryController {
  constructor(private categoryService: CategoryService) {}

  async getCategories() {
    const data = await this.categoryService.findAll();
    return data;
  }

  async getGategoryById(req: Request) {
    const { categoryId } = req.params;
    const populatedCategory = await this.categoryService.findById(categoryId);
    return populatedCategory;
  }

  async addCategory(req: Request<any, any, ICategoryCreate>) {
    const category = req.body;
    const data = await this.categoryService.add(category);
    return data;
  }
}

const categoryController = new CategoryController(new CategoryService());
export default categoryController;
