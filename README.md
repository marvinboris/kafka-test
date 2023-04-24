# Task Management Microservice

This is a TypeScript-based microservice for managing tasks. It uses Node.js, Express, Mongoose, and KafkaJS, and follows the Domain-Driven Design (DDD) architecture.

## Getting Started

### Prerequisites

Before you can run this microservice, you need to have the following software installed on your machine:

- Node.js
- MongoDB
- Kafka

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/marvinboris/kafka-test.git
   ```

2. Install the dependencies:

   ```
   cd kafka-test
   npm install
   ```

3. Configure the environment variables:

   Create a `.env` file in the root directory of the project and add the following variables:

   ```
   PORT=<port>
   MONGODB_URI=<mongodb-uri>
   KAFKA_BROKER=<kafka-broker>
   KAFKA_CLIENT_ID=<kafka-client-id>
   KAFKA_GROUP_ID=<kafka-group-id>
   ```

   Replace the placeholders with appropriate values.

4. Start the microservice:

   ```
   npm start
   ```

## Usage

The microservice exposes the following endpoints:

### POST /tasks

Create a new task.

Request Body:

```
{
  "name": "Task name",
  "description": "Task description",
  "status": "pending"
}
```

### GET /tasks

Get a list of all tasks.

### GET /tasks/:taskId

Get a task by ID.

### PUT /tasks/:taskId

Update a task by ID.

Request Body:

```
{
  "name": "Updated task name",
  "status": "completed"
}
```

### DELETE /tasks/:taskId

Delete a task by ID.

## Architecture

This microservice follows the Domain-Driven Design (DDD) architecture, which separates the application into multiple layers: presentation, application, domain, and infrastructure.

- **Presentation layer:** This layer includes the routes and controllers that handle incoming requests and send responses back to the client.

- **Application layer:** This layer includes the services that encapsulate the business logic related to tasks.

- **Domain layer:** This layer includes the models and entities that represent the domain objects of the application.

- **Infrastructure layer:** This layer includes the database and messaging components that handle data storage and communication with other services.

## License

This project is licensed under the [MIT License](LICENSE).
