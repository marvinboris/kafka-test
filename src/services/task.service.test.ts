import dotenv from "dotenv";
import mongoose from "mongoose";

import { TaskModel, TaskStatus } from "../models/task.model";
import { TaskService } from "./task.service";

dotenv.config();

describe("TaskService", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("create", () => {
    it("should create a new task", async () => {
      const task = { name: "Task 1", status: TaskStatus.DONE };

      const result = await TaskService.create(task);

      expect(result).toBeDefined();
      expect(result.name).toEqual(task.name);
      expect(result.status).toEqual(task.status);
    });
  });

  describe("findAll", () => {
    it("should return an array of tasks", async () => {
      const result = await TaskService.findAll();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
    });
  });

  describe("findById", () => {
    it("should return a task with the given ID", async () => {
      const taskData = { name: "Task 1", status: TaskStatus.DONE };
      const createdTask = await TaskModel.create(taskData);
      const task = createdTask.toObject();

      const result = await TaskService.findById(task._id);

      expect(result).toBeDefined();
      expect(result.name).toEqual(task.name);
      expect(result.status).toEqual(task.status);
    });

    it("should throw an error if no task is found with the given ID", async () => {
      const taskData = { name: "Task 1", status: TaskStatus.DONE };
      const createdTask = await TaskModel.create(taskData);

      const task = createdTask.toObject();
      await TaskModel.deleteOne({ _id: task._id });

      const promise = TaskService.findById(task._id);
      await expect(promise).rejects.toThrow(`Task not found`);
    });
  });

  describe("updateById", () => {
    it("should update an existing task", async () => {
      const taskData = { name: "Task 1", status: TaskStatus.DONE };
      const createdTask = await TaskModel.create(taskData);
      const task = createdTask.toObject();

      const updatedTask = await TaskService.updateById(task._id, {
        id: task._id,
        name: "Updated Task",
      });

      expect(updatedTask).toBeDefined();
      expect(updatedTask._id.toString()).toBe(task._id.toString());
      expect(updatedTask.name).toBe("Updated Task");
    });

    it("should throw an error if task is not found", async () => {
      const taskData = { name: "Task 1", status: TaskStatus.DONE };
      const createdTask = await TaskModel.create(taskData);

      const task = createdTask.toObject();
      await TaskModel.deleteOne({ _id: task._id });

      const promise = TaskService.updateById(task._id, {
        name: "Updated Task",
        id: task._id,
      });
      await expect(promise).rejects.toThrowError("Task not found");
    });
  });

  describe("deleteById", () => {
    it("should delete a task", async () => {
      const taskData = { name: "Task 1", status: TaskStatus.DONE };
      const createdTask = await TaskModel.create(taskData);

      const task = createdTask.toObject();

      const result = await TaskService.deleteById(task._id);

      expect(result).toEqual(undefined);
    });

    it("should throw an error if the task does not exist", async () => {
      const taskData = { name: "Task 1", status: TaskStatus.DONE };
      const createdTask = await TaskModel.create(taskData);

      const task = createdTask.toObject();
      await TaskModel.deleteOne({ _id: task._id });

      try {
        await TaskService.deleteById(task._id);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect((<Error>err).message).toEqual("Task not found");
      }
    });
  });
});
