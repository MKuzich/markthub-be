import { Model, model, Schema } from "mongoose";
import Joi from "joi";
import { ITodo } from "../types/todos.type";

export const schemaCreateTodo = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  data: Joi.string().min(10).max(500).required(),
  public: Joi.boolean().required(),
});

export const schemaUpdateTodo = Joi.object({
  title: Joi.string().min(3).max(30),
  data: Joi.string().min(10).max(500),
  public: Joi.boolean(),
  complited: Joi.boolean(),
});

const todoSchema = new Schema<ITodo>({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    required: true,
  },
  complited: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: String,
    ref: "User",
  },
});

const Todo: Model<ITodo> = model("Todo", todoSchema);

export default Todo;
