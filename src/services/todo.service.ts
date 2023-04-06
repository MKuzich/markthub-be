import Todo from "../models/Todo";
import { ITodo, ITodoCreate } from "../types/todos.type";
import { chooseFilter } from "../helpers/chooseFilter";
import { createError } from "../helpers/errors";

export default class TodoService {
  async findAll(
    id: string,
    search: string,
    filter: string,
    skip: number,
    limit: number
  ) {
    const filterObj = chooseFilter(filter);
    const todos = await Todo.find({
      $or: [
        { public: true, title: { $regex: search, $options: "i" } },
        { public: false, title: { $regex: search, $options: "i" }, owner: id },
      ],
    })
      .where(filterObj)
      .skip(skip)
      .limit(limit);
    const total = await Todo.find({
      $or: [
        { public: true, title: { $regex: search, $options: "i" } },
        { public: false, title: { $regex: search, $options: "i" }, owner: id },
      ],
    })
      .where(filterObj)
      .countDocuments();
    return { todos, total };
  }

  async findById(id: string) {
    const todo = await Todo.findOne({ _id: id });
    return todo;
  }

  async add(id: string, data: ITodoCreate) {
    const todo = await Todo.create({ ...data, owner: id });
    return todo;
  }

  async change(id: string, data: ITodo, userId: string) {
    const todoCheck = await Todo.findById(id);
    if (userId.toString() !== todoCheck?.owner) {
      throw createError(401, "It's not your todo!");
    }
    const todo = await Todo.findByIdAndUpdate(id, data, { new: true });
    return todo;
  }

  async delete(id: string) {
    const todo = await Todo.findByIdAndRemove({ _id: id });
    return todo;
  }
}
