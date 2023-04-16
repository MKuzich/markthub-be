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
  product: string;
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
  description: string;
  active: boolean;
  owner: string;
  ordersPerDay: number;
  totalOrders: number;
  rate: number;
  date: Date;
  quantity: number;
  reviews: string[];
}

export interface IProductPagination extends ParamsDictionary {
  page: string;
  limit: string;
}

export interface IProductFilter {
  category?: string;
  price?: { min?: number; max?: number };
  withImage?: boolean;
  withPromoPrice?: boolean;
  owner?: string;
  active?: boolean;
  rate?: { min?: number; max?: number };
  totalOrders?: number;
  withReviews?: boolean;
  inStock?: number;
  search?: string;
}

export type IProductsQuery = IProductPagination & IProductFilter;

export interface IProductQuery {
  category?: string;
  price?: {
    $gte?: number;
    $lte?: number;
  };
  images?: {
    $exists: boolean;
    $ne?: any[];
  };
  promoPrice?: {
    $gt: number;
  };
  owner?: string;
  active?: boolean;
  rate?: {
    $gte?: number;
    $lte?: number;
  };
  totalOrders?: {
    $gte: number;
  };
  reviews?: {
    $exists: boolean;
    $ne?: any[];
  };
  quantity?: {
    $gte: number;
  };
  $and?: Array<{
    $or: Array<{
      header: RegExp;
      description: RegExp;
    }>;
  }>;
}
