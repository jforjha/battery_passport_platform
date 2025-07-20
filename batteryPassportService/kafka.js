require("dotenv").config();
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "battery-passport-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

const producer = kafka.producer();

const connectProducer = async () => {
  try {
    await producer.connect();
    console.log("Producer connected");
  } catch (err) {
    console.error("Producer failed :", err);
  }
};

connectProducer();

const emitEvent = async (topic, message) => {
  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log("Message sent: ", topic);
  } catch (err) {
    console.error("❌ Failed to sent: ", err);
  }
};

module.exports = { emitEvent };
