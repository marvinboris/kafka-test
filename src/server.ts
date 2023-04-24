import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import { consumer } from "./config/kafka";
import taskRoutes from "./routes/task.routes";

dotenv.config();

const app = express();
app.use(express.json());

// Define routes
app.use("/tasks", taskRoutes);

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

  // consumer.connect().then(() => {
  //   consumer.subscribe({ topic: "task-status", fromBeginning: false });
  //   consumer.run({
  //     eachMessage: async ({ topic, partition, message }) => {
  //       console.log(
  //         `Received message ${message.value?.toString()} in topic ${topic}`
  //       );
  //       // Call the taskService to update the task status based on the Kafka message
  //       // await TaskService.updateByIdStatus(message.value?.toString());
  //     },
  //   });
  // });
});

export default app;
