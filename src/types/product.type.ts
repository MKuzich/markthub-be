export interface IProduct {
  _id: string;
  name: string;
  category: string;
  image?: string;
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
  image?: string;
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
  image?: string;
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
  image?: string;
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

export interface IProductsQueryParams {
  search: string;
  filter: string;
  page: number;
  limit: number;
}
