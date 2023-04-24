import { CreateTaskDTO } from "../dtos/task/create.dto";
import { UpdateTaskDTO } from "../dtos/task/update.dto";

import { TaskModel } from "../models/task.model";

export class TaskRepository {
  static create = async (task: CreateTaskDTO) => await TaskModel.create(task);

  static findAll = async () => await TaskModel.find();

  static findById = async (id: string) => await TaskModel.findById(id);

  static updateById = async (id: string, task: UpdateTaskDTO) =>
    await TaskModel.findByIdAndUpdate(id, task, { new: true });

  static deleteById = async (id: string) =>
    await TaskModel.findByIdAndDelete(id);
}
