import { CreateTaskDTO } from "../dtos/task/create.dto";
import { UpdateTaskDTO } from "../dtos/task/update.dto";

import { TaskRepository } from "../repositories/task.repository";

export class TaskService {
  static create = async (task: CreateTaskDTO) => {
    const createdTask = await TaskRepository.create(task);
    return createdTask.toObject();
  };

  static findAll = async () => {
    const tasks = await TaskRepository.findAll();
    return tasks.map((task) => task.toObject());
  };

  static findById = async (id: string) => {
    const task = await TaskRepository.findById(id);
    if (!task) throw new Error(`Task not found`);
    return task.toObject();
  };

  static updateById = async (id: string, update: UpdateTaskDTO) => {
    const task = await TaskRepository.updateById(id, update);
    if (!task) throw new Error(`Task not found`);
    return task.toObject();
  };

  static deleteById = async (id: string) => {
    const result = await TaskRepository.deleteById(id);
    if (!result) throw new Error(`Task not found`);
  };
}
