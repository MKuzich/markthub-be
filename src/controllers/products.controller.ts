import { Request } from "express";
import ProductService from "../services/product.service";
import CategoryService from "../services/category.service";
import UserService from "../services/user.service";
import {
  IProduct,
  IProductsQueryParams,
  IProductCreate,
  IProductChangeData,
} from "../types/product.type";
import { IRequest } from "../types/request.type";
import { IFile } from "../types/file.type";
import { IUserTokenPayload } from "../types/user.type";

class ProductController {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  async getProducts(
    req: IRequest<any, IProductsQueryParams, any, any>
  ): Promise<{ products: IProduct[]; total: number }> {
    const { search = "", filter, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;
    const data = await this.productService.findAll(search, filter, skip, limit);
    return data;
  }

  async getProductById(req: Request<{ productId: string }>) {
    const { productId } = req.params;
    const product = await this.productService.findById(productId);
    return product;
  }

  async addProduct(req: IRequest<IProductCreate, any, any, IFile[]>) {
    const { id } = req.user as IUserTokenPayload;
    const data = req.body;
    const images = req.files;
    let fileArray: Express.Multer.File[] = [];
    if (Array.isArray(images)) {
      fileArray = images;
    } else if (typeof images === "object" && images !== null) {
      fileArray = Object.values(images).flat();
    }
    const product = await this.productService.add(id, data, fileArray);
    await this.userService.addProduct(id, product._id);
    await this.categoryService.addProduct(product.category, product._id);
    return product;
  }

  async changeProduct(
    req: Request<{ productId: string }, any, IProductChangeData>
  ) {
    const { productId } = req.params;
    const { id } = req.user as IUserTokenPayload;
    const data = req.body;
    const isUpdated = await this.productService.change(id, productId, data);
    return isUpdated;
  }

  async deleteProduct(req: Request<{ productId: string }>) {
    const { productId } = req.params;
    const { id } = req.user as IUserTokenPayload;
    const product = await this.productService.delete(id, productId);
    await this.userService.deleteProduct(id, product._id);
    await this.categoryService.deleteProduct(product.category, product._id);
    return product;
  }
}

const productController = new ProductController(
  new ProductService(),
  new CategoryService(),
  new UserService()
);
export default productController;
