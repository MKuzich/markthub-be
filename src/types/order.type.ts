import { IProductOrdered } from "./product.type";

export interface IOrder {
  _id: string;
  date: Date;
  owner: string;
  destination: {
    firstName: string;
    secondName: string;
    phone: string;
    country: string;
    city: string;
    address: string;
  };
  products: IProductOrdered[];
  totalPrice: number;
  priceWithoutPromo: number;
}
