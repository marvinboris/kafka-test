import mongoose from "mongoose";
import { agent } from "supertest";

import { TaskModel, TaskStatus } from "../models/task.model";
import server from "../server";

describe("TaskController", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe("GET /tasks", () => {
    it("should list all tasks", async () => {
      const response = await agent(server).get("/tasks").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const taskData = { name: "Test Task", status: TaskStatus.TODO };
      const response = await agent(server)
        .post("/tasks")
        .send(taskData)
        .expect(201);

      expect(response.body.name).toEqual(taskData.name);
      expect(response.body.status).toEqual(taskData.status);
    });
  });

  describe("GET /tasks/:id", () => {
    it("should return a single task", async () => {
      const task = await TaskModel.create({ name: "New Task" });
      const response = await agent(server).get(`/tasks/${task.id}`).expect(200);

      expect(response.body.name).toBe(task.name);
      expect(response.body.status).toBe(task.status);
    });
  });

  describe("PUT /tasks/:id", () => {
    it("should update an existing task", async () => {
      const task = await TaskModel.create({ name: "New Task" });
      const updatedTask = {
        name: "Updated Task",
        status: TaskStatus.DONE,
      };

      const response = await agent(server)
        .put(`/tasks/${task.id}`)
        .send(updatedTask)
        .set("Accept", "application/json")
        .expect(200);

      expect(response.body.name).toBe(updatedTask.name);
      expect(response.body.status).toBe(updatedTask.status);
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("should delete an existing task", async () => {
      const task = await TaskModel.create({ name: "New Task" });
      await agent(server).delete(`/tasks/${task.id}`).expect(204);
    });
  });
});
