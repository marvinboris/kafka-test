import dotenv from "dotenv";
import mongoose from "mongoose";

import { TaskRepository } from "./task.repository";
import { TaskModel } from "../models/task.model";

dotenv.config();

describe("TaskRepository", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI!);
  });

  afterEach(async () => {
    await TaskModel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("create", () => {
    test("should create a new task", async () => {
      const taskData = {
        name: "Test Task",
      };
      const createdTask = await TaskRepository.create(taskData);
      expect(createdTask.name).toEqual(taskData.name);
    });
  });

  describe("findAll", () => {
    test("should return an array of tasks", async () => {
      const taskData = {
        name: "Test Task",
      };
      await TaskRepository.create(taskData);
      const tasks = await TaskRepository.findAll();
      expect(tasks).toBeInstanceOf(Array);
      expect(tasks).toHaveLength(1);
      expect(tasks[0].name).toEqual(taskData.name);
    });
  });

  describe("findById", () => {
    test("should return a task by id", async () => {
      const taskData = {
        name: "Test Task",
      };
      const createdTask = await TaskRepository.create(taskData);
      const task = await TaskRepository.findById(createdTask._id);

      expect(task?.name).toEqual(taskData.name);
    });

    test("should return null if no task found", async () => {
      const taskData = {
        name: "Test Task",
      };
      const createdTask = await TaskRepository.create(taskData);
      await TaskRepository.deleteById(createdTask.id);
      const task = await TaskRepository.findById(createdTask.id);
      expect(task).toBeNull();
    });
  });

  describe("updateById", () => {
    test("should update a task by id", async () => {
      const taskData = {
        name: "Test Task",
      };
      const createdTask = await TaskRepository.create(taskData);

      const updatedTaskData = { id: createdTask.id, name: "Updated Task" };
      const updatedTask = await TaskRepository.updateById(
        createdTask._id,
        updatedTaskData
      );

      expect(updatedTask?.name).toEqual(updatedTaskData.name);
    });
  });

  describe("deleteById", () => {
    test("should delete a task by id", async () => {
      const taskData = {
        name: "Test Task",
      };
      const createdTask = await TaskRepository.create(taskData);
      await TaskRepository.deleteById(createdTask._id);
      const task = await TaskRepository.findById(createdTask._id);
      expect(task).toBeNull();
    });
  });
});
