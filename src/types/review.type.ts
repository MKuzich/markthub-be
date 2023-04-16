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

export interface IReviewPagination extends ParamsDictionary {
  page: string;
  limit: string;
}

export interface IReviewFilter {
  owner?: string;
  product?: string;
  rate?: { min?: number; max?: number };
  search?: string;
}

export type IReviewsQuery = IReviewPagination & IReviewFilter;

export interface IReviewQuery {
  owner?: string;
  product?: string;
  rate?: {
    $gte?: number;
    $lte?: number;
  };
  $and?: Array<{
    $or: Array<{
      header: RegExp;
      description: RegExp;
    }>;
  }>;
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
