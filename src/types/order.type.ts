export interface IOrderedProducts {
  product: string;
  quantity: number;
}

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
  products: IOrderedProducts[];
  totalPrice: number;
  priceWithoutPromo: number;
}
