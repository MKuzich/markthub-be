import { Request } from "express";
import TodoService from "../services/todo.service";
import { ITodo, ITodoCreate, IQueryParams } from "../types/todos.type";

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(
    req: Request<any, any, any, IQueryParams>
  ): Promise<{ todos: ITodo[]; total: number } | null> {
    const id = req?.user?._id ?? "";
    const {
      search = "",
      filter,
      page = "1",
      limit = "10",
    }: IQueryParams = req.query;
    const numbLimit = Number(limit);
    const skip = Number(page) > 1 ? (Number(page) - 1) * numbLimit : 0;
    const data = await this.todoService.findAll(
      id,
      search,
      filter,
      skip,
      numbLimit
    );
    return data;
  }

  async getById(req: Request<{ id: string }>): Promise<ITodo | null> {
    const { id } = req.params;
    const todo = await this.todoService.findById(id);
    return todo;
  }

  async addTodo(req: Request<any, any, ITodoCreate>): Promise<ITodo | never> {
    const data: ITodoCreate = req.body;
    const id = req?.user?._id ?? "";
    const todo = await this.todoService.add(id, data);
    return todo;
  }

  async changeTodo(
    req: Request<{ id: string }, any, ITodo>
  ): Promise<ITodo | null> {
    const usedId = req?.user?._id ?? "";
    const { id } = req.params;
    const data: ITodo = req.body;
    const todo = await this.todoService.change(id, data, usedId);
    return todo;
  }

  async deleteTodo(req: Request<{ id: string }>): Promise<ITodo | null> {
    const { id } = req.params;
    const todo = await this.todoService.delete(id);
    return todo;
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
