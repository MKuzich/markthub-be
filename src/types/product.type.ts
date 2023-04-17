import { ParamsDictionary } from "express-serve-static-core";
import { Types } from "mongoose";

export interface IProductsInOrder {
  order: Types.ObjectId;
  quantity: number;
}

export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  category: Types.ObjectId;
  images?: string[];
  price: number;
  promoPrice: number;
  description: string;
  owner: Types.ObjectId;
  active: boolean;
  rate: number;
  ordersPerDay: number;
  totalOrders: number;
  date: Date;
  reviews: Types.ObjectId[];
  orders: IProductsInOrder[];
  quantity: number;
}

export interface IProductCreate {
  name: string;
  category: Types.ObjectId;
  images?: string[];
  price: number;
  promoPrice?: number;
  description: string;
  quantity: number;
}

export interface IProductsQuantity {
  product: Types.ObjectId;
  amount: number;
}

export interface IProductChangeData {
  name?: string;
  category?: Types.ObjectId;
  images?: string[];
  price?: number;
  promoPrice?: number;
  description?: string;
  active?: boolean;
  quantity?: number;
}

export interface IProductChange {
  action: string;
  data: IProductChangeData;
}

export interface IProductOrdered {
  _id: Types.ObjectId;
  name: string;
  category: Types.ObjectId;
  images?: string[];
  price: number;
  promoPrice: number;
  description: string;
  active: boolean;
  owner: Types.ObjectId;
  ordersPerDay: number;
  totalOrders: number;
  rate: number;
  date: Date;
  quantity: number;
  reviews: Types.ObjectId[];
}

export interface ISortObject {
  [key: string]: "asc" | "desc";
}

export interface IProductPagination extends ParamsDictionary {
  page: string;
  limit: string;
  sort: string; //key1:asc,key2:desc,key3:asc
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
