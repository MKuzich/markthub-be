export interface IReview {
  id: string;
  date: Date;
  owner: string;
  product: string;
  title: string;
  text: string;
  rate: number;
}
