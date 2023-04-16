import { ParamsDictionary } from "express-serve-static-core";

export interface IOrderedProducts {
  product: string;
  amount: number;
}

export interface IOrder {
  _id: string;
  owner: string;
  destination: {
    firstName: string;
    secondName: string;
    phone: string;
    country: string;
    city: string;
    address: string;
  };
  info: string | null;
  products: IOrderedProducts[];
  totalPrice: number;
  priceWithoutPromo: number;
  status: "Pending" | "Paid" | "Shipped" | "Delivered" | "Canceled";
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderCreate {
  destination: {
    firstName: string;
    secondName: string;
    phone: string;
    country: string;
    city: string;
    address: string;
  };
  info?: string;
  products: IOrderedProducts[];
  totalPrice: number;
  priceWithoutPromo: number;
}

export interface IOrderChange {
  destination?: {
    firstName?: string;
    secondName?: string;
    phone?: string;
    country?: string;
    city?: string;
    address?: string;
  };
  info?: string | null;
  products?: IOrderedProducts[];
  totalPrice?: number;
  priceWithoutPromo?: number;
  status?: "Pending" | "Paid" | "Shipped" | "Delivered" | "Canceled";
  updatedAt?: Date;
}

export interface IOrderPagination extends ParamsDictionary {
  page: string;
  limit: string;
}

export interface IOrderFilter {
  status?: "Pending" | "Paid" | "Shipped" | "Delivered" | "Canceled";
  totalPrice?: { min?: number; max?: number };
  createdAt?: { from?: Date; to?: Date };
  search?: string;
}

export type IOrdersQuery = IOrderPagination & IOrderFilter;

export interface IOrderQuery {
  owner?: string;
  status?: "Pending" | "Paid" | "Shipped" | "Delivered" | "Canceled";
  createdAt?: {
    from?: Date;
    to?: Date;
  };
  totalPrice?: {
    min?: number;
    max?: number;
  };
  $and?: any[];
}
