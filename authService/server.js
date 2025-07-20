require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const kafka = require("./kafka");
const authRoutes = require("./src/routes");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Kafka Producer
const producer = kafka.producer();

// Initialize Kafka
async function initKafka() {
  await producer.connect();
  console.log("Kafka producer connected");
}
initKafka().catch(console.error);

// Send Kafka Event Helper
async function sendKafkaEvent(topic, message) {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log("Kafka event sent:", topic, message);
  } catch (err) {
    console.error("Kafka send error:", err);
  }
}

// Attach Kafka to request (for use in routes)
app.use((req, res, next) => {
  req.kafka = {
    producer,
    sendEvent: sendKafkaEvent,
  };
  next();
});

// Routes
app.use("/api/auth", authRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
