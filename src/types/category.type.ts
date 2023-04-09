export interface ICategory {
  id: string;
  name: string;
  tag: string;
  desription: string;
  image: string;
}

export interface ICategoryCreate {
  name: string;
  tag: string;
  desription: string;
  image: string;
}
