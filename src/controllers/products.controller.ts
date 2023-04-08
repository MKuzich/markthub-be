import { Request } from "express";
import ProductsService from "../services/products.service";
import {
  IProduct,
  IProductsQueryParams,
  IProductCreate,
  IProductChange,
} from "../types/product.type";

class ProductsController {
  constructor(private productsService: ProductsService) {}

  async getProducts(
    req: Request<any, any, any, IProductsQueryParams>
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

  async addProduct(req: Request<any, any, IProductCreate>) {
    const data = req.body;
    const product = await this.productsService.add(data);
    return product;
  }

  async changeProduct(req: Request<{ id: string }, any, IProductChange>) {
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
