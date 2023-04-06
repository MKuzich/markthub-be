export interface IProduct {
  _id: string;
  firstName: string;
  secondName: string;
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
