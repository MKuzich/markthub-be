import { ParamsDictionary } from "express-serve-static-core";

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
}

export interface IProductChange {
  _id: string;
  name?: string;
  category?: string;
  images?: string[];
  price?: number;
  promoPrice?: number;
  description?: string;
  owner: string;
  active?: boolean;
  rate?: number;
  quantity?: number;
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
