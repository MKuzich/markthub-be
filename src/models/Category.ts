import { Model, model, Schema } from "mongoose";

import { ICategory } from "../types/category.type";

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  desription: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Category: Model<ICategory> = model("Category", categorySchema);

export default Category;
