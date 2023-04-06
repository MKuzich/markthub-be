import { IProductSent } from "./product.type";

export interface ITransaction {
  _id: string;
  owner: string;
  products: IProductSent[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
