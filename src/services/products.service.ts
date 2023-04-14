import { v4 as uuidv4 } from "uuid";
import { BlobServiceClient } from "@azure/storage-blob";
import Product from "../models/Product";
import {
  IProductCreate,
  IProductChangeData,
  IProductsQuantity,
} from "../types/product.type";
import { IFile } from "../types/file.type";
import { createError } from "../helpers/errors";

const { AZURE_STORAGE_CONNECTION_STRING } = process.env;

export default class ProductsService {
  async findAll(search: string, filter: string, skip: number, limit: number) {
    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.find().countDocuments();
    return { products, total };
  }

  async findById(id: string) {
    const product = await Product.findById(id);
    return product;
  }

  async add(product: IProductCreate, files: IFile[]) {
    const newProduct = product;
    const images: string[] = [];
    const containerName = "product-photos";
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING!
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const uploads = files;
    if (uploads && uploads.length > 0) {
      for (const upload of uploads) {
        const filename = uuidv4() + "-" + upload.originalname;
        const blobClient = containerClient.getBlockBlobClient(filename);
        await blobClient.uploadData(upload.buffer, {
          blobHTTPHeaders: { blobContentType: upload.mimetype },
        });
        images.push(blobClient.url);
        newProduct.images = images;
      }
    }
    const data = await Product.create(newProduct);
    return data;
  }

  async changeQuantityAndOrders(products: IProductsQuantity[]) {
    const selectedProducts = await Product.find({
      $or: products.map(({ _id }) => {
        return { _id };
      }),
    });

    if (products.length !== selectedProducts.length) {
      return createError(404, `All products not found.`);
    }

    const isNotEnoughQuantity = selectedProducts.some(
      ({ _id, quantity }) =>
        products.find((product) => product._id === _id.toString())!.amount >
        quantity
    );
    if (isNotEnoughQuantity) {
      return createError(400, `An insufficient amount of products at stock!`);
    }

    const changeProductsPromises = products.map(({ _id, amount }) => {
      const selectedProduct = selectedProducts.find(
        (product) => product._id.toString() === _id
      )!;
      return Product.findByIdAndUpdate(
        _id,
        {
          quantity: selectedProduct.quantity - amount,
          ordersPerDay: selectedProduct.ordersPerDay + amount,
          totalOrders: selectedProduct.totalOrders + amount,
        },
        { new: true }
      );
    });

    const orderedProducts = await Promise.all(changeProductsPromises);
    return orderedProducts;
  }

  async change(id: string, data: IProductChangeData) {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    return product;
  }

  async delete(_id: string) {
    const product = await Product.findByIdAndRemove({ _id });
    return product;
  }
}
