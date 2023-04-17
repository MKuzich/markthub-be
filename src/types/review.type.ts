import { ParamsDictionary } from "express-serve-static-core";
import { Types } from "mongoose";

export interface IReview {
  _id: Types.ObjectId;
  date: Date;
  owner: Types.ObjectId;
  product: Types.ObjectId;
  title: string;
  text: string;
  rate: number;
}

export interface IReviewPagination extends ParamsDictionary {
  page: string;
  limit: string;
  sort: string;
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
      title: RegExp;
      text: RegExp;
    }>;
  }>;
}

export interface IReviewCreate {
  product: Types.ObjectId;
  title: string;
  text: string;
  rate: number;
}

export interface IReviewChange {
  title?: string;
  text?: string;
  rate?: number;
}
