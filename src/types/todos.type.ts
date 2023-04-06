import { Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  data: string;
  public: boolean;
  complited: boolean;
  owner: string;
}

export interface ITodoCreate extends Document {
  title: string;
  data: string;
  public: boolean;
}

export interface IQueryParams {
  search: string;
  filter: string;
  page: string;
  limit: string;
}

export interface IFilter {
  public?: boolean;
  complited?: boolean;
}
