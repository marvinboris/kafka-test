import { Request, Response } from "express";

import { producer } from "../config/kafka";
import { CreateTaskDTO } from "../dtos/task/create.dto";
import { UpdateTaskDTO } from "../dtos/task/update.dto";
import { TaskService } from "../services/task.service";

export class TaskController {
  static create = async (req: Request, res: Response) => {
    const createDTO: CreateTaskDTO = req.body;

    try {
      const task = await TaskService.create(createDTO);

      //   await producer.connect();
      //   await producer.send({
      //     topic: "new-task",
      //     messages: [{ value: JSON.stringify(task) }],
      //   });
      //   await producer.disconnect();

      res.status(201).json(task);
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message });
    }
  };

  static findAll = async (req: Request, res: Response) => {
    try {
      const tasks = await TaskService.findAll();
      res.json(tasks);
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message });
    }
  };

  static findById = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const task = await TaskService.findById(id);
      res.json(task);
    } catch (err) {
      res.status(404).json({ error: "Task not found" });
    }
  };

  static updateById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateByIdDTO: UpdateTaskDTO = req.body;

    try {
      const task = await TaskService.updateById(id, updateByIdDTO);

      //   await producer.connect();
      //   await producer.send({
      //     topic: "updated-task",
      //     messages: [{ value: JSON.stringify(task) }],
      //   });
      //   await producer.disconnect();

      res.json(task);
    } catch (err) {
      const error = err as Error;
      res.status(400).json({ error: error.message });
    }
  };

  static deleteById = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      await TaskService.deleteById(id);
      res.sendStatus(204);
    } catch (err) {
      res.status(404).json({ error: "Task not found" });
    }
  };
}
