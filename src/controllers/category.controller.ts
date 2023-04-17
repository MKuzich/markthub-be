import { Request } from "express";
import CategoryService from "../services/category.service";
import UserService from "../services/user.service";
import { ICategoryCreate } from "../types/category.type";
import { IUserTokenPayload } from "../types/user.type";
import { createError } from "../helpers/errors";

const { AMDIN_EMAIL } = process.env;

class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

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
    const { id } = req.user as IUserTokenPayload;
    const user = await this.userService.getCurrent(id);
    if (user.email !== AMDIN_EMAIL) {
      throw createError(401, "You have not rights.");
    }
    const category = req.body;
    const data = await this.categoryService.add(category);
    return data;
  }
}

const categoryController = new CategoryController(
  new CategoryService(),
  new UserService()
);
export default categoryController;
