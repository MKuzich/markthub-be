import { Request } from "express";
import ProductService from "../services/product.service";
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
  constructor(private productService: ProductService) {}

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
    const isDeleted = await this.productService.delete(id, productId);
    return isDeleted;
  }
}

const productController = new ProductController(new ProductService());
export default productController;
