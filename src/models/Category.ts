import { Model, model, Schema } from "mongoose";

import { ICategory } from "src/types/category.type";

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  desription: {
    type: String,
    required: true,
  },
});

const Category: Model<ICategory> = model("Categiry", categorySchema);

export default Category;
