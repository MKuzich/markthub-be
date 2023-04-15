import { ParamsDictionary } from "express-serve-static-core";

export interface IProductsInOrder {
  order: string;
  quantity: number;
}

export interface IProduct {
  _id: string;
  name: string;
  category: string;
  images?: string[];
  price: number;
  promoPrice: number;
  description: string;
  owner: string;
  active: boolean;
  rate: number;
  ordersPerDay: number;
  totalOrders: number;
  date: Date;
  reviews: string[];
  orders: IProductsInOrder[];
  quantity: number;
}

export interface IProductCreate {
  name: string;
  category: string;
  images?: string[];
  price: number;
  promoPrice?: number;
  description: string;
  owner: string;
  quantity: number;
  ordersPerDay?: number;
  totalOrders?: number;
}

export interface IProductsQuantity {
  _id: string;
  amount: number;
}

export interface IProductChangeData {
  name?: string;
  category?: string;
  images?: string[];
  price?: number;
  promoPrice?: number;
  description?: string;
  active?: boolean;
  rate?: number;
  reviews?: string[];
  quantity?: number;
  ordersPerDay?: number;
  totalOrders?: number;
}

export interface IProductChange {
  action: string;
  data: IProductChangeData;
}

export interface IProductOrdered {
  _id: string;
  name: string;
  category: string;
  images?: string[];
  price: number;
  promoPrice: number;
  owner: string;
  rate: number;
  date: Date;
  quantity: number;
}

export interface IProductSent {
  product: string;
  quantity: number;
  price: number;
}

export interface IProductsQueryParams extends ParamsDictionary {
  search: string;
  filter: string;
  page: string;
  limit: string;
}
