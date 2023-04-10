import { v4 as uuidv4 } from "uuid";
import { BlobServiceClient } from "@azure/storage-blob";
import Product from "../models/Product";
import { IProductCreate, IProductChangeData } from "../types/product.type";
import { IFile } from "../types/file.type";

export default class ProductsService {
  async findAll(search: string, filter: string, skip: number, limit: number) {
    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.find().countDocuments();
    return { products, total };
  }

  async findById(_id: string) {
    const product = await Product.findOne({ _id });
    return product;
  }

  async add(product: IProductCreate, files: IFile[]) {
    const newProduct = product;
    const images: string[] = [];
    const containerName = "product-photos";
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env.AZURE_STORAGE_CONNECTION_STRING!
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

  async change(id: string, data: IProductChangeData) {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    return product;
  }

  async delete(_id: string) {
    const product = await Product.findByIdAndRemove({ _id });
    return product;
  }
}
