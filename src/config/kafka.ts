import dotenv from "dotenv";
import { Kafka } from "kafkajs";

dotenv.config();

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [process.env.KAFKA_BROKER!],
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID!,
});
