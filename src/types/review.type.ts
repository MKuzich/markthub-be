import { ParamsDictionary } from "express-serve-static-core";

export interface IReview {
  id: string;
  date: Date;
  owner: string;
  product: string;
  title: string;
  text: string;
  rate: number;
}

export interface IReviewQueryParams extends ParamsDictionary {
  search: string;
  filter: string;
  page: string;
  limit: string;
}

export interface IReviewCreate {
  product: string;
  title: string;
  text: string;
  rate: number;
}

export interface IReviewChange {
  title?: string;
  text?: string;
  rate?: number;
}
