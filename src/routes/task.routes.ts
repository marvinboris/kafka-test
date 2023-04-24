import express from "express";

import { TaskController } from "../controllers/task.controller";

const taskRoutes = express.Router();

taskRoutes.get("/", TaskController.findAll);
taskRoutes.get("/:id", TaskController.findById);
taskRoutes.post("/", TaskController.create);
taskRoutes.put("/:id", TaskController.updateById);
taskRoutes.delete("/:id", TaskController.deleteById);

export default taskRoutes;
