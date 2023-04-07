import { Request } from "express";
import ProductsService from "../services/products.service";
import { IProduct, IProductsQueryParams } from "../types/product.type";

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
}

const productsController = new ProductsController(new ProductsService());
export default productsController;
