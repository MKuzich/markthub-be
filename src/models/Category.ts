import { Model, model, Schema, Types } from "mongoose";
import Joi from "joi";
import { ICategory } from "../types/category.type";

export const createCategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  tag: Joi.string().regex(/^\S+$/).required(),
  image: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.string().custom((value, helpers) => {
        if (!Types.ObjectId.isValid(value)) {
          return helpers.error("any.invalid");
        }
        return value;
      })
    )
    .default([]),
});

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
  products: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    default: [],
  },
});

const Category: Model<ICategory> = model("Category", categorySchema);

export default Category;
