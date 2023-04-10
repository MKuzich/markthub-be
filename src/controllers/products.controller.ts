import { Request } from "express";
import ProductsService from "../services/products.service";
import {
  IProduct,
  IProductsQueryParams,
  IProductCreate,
  IProductChangeData,
} from "../types/product.type";
import { IRequest } from "../types/request.type";
import { IFile } from "../types/file.type";

class ProductsController {
  constructor(private productsService: ProductsService) {}

  async getProducts(
    req: IRequest<any, IProductsQueryParams, any, any>
  ): Promise<{ products: IProduct[]; total: number }> {
    const { search = "", filter, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;
    const data = await this.productsService.findAll(
      search,
      filter,
      skip,
      limit
    );
    return data;
  }

  async getProductById(req: Request<{ id: string }>) {
    const { id } = req.params;
    const product = await this.productsService.findById(id);
    return product;
  }

  async addProduct(req: IRequest<IProductCreate, any, any, IFile[]>) {
    const data = req.body;
    const images = req.files;
    let fileArray: Express.Multer.File[] = [];
    if (Array.isArray(images)) {
      fileArray = images;
    } else if (typeof images === "object" && images !== null) {
      fileArray = Object.values(images).flat();
    }
    const product = await this.productsService.add(data, fileArray);
    return product;
  }

  async changeProduct(req: Request<{ id: string }, any, IProductChangeData>) {
    const { id } = req.params;
    const data = req.body;
    const product = await this.productsService.change(id, data);
    return product;
  }

  async deleteProduct(req: Request<{ id: string }>) {
    const { id } = req.params;
    const product = await this.productsService.delete(id);
    return product;
  }
}

const productsController = new ProductsController(new ProductsService());
export default productsController;
