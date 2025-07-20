require('dotenv').config();
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'notification-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const producer = kafka.producer();

const sendNotification = async (message) => {
  await producer.connect();
  await producer.send({
    topic: process.env.KAFKA_TOPIC || 'battery-passport-events',
    messages: [
      { value: JSON.stringify(message) }
    ],
  });
  console.log('[Kafka] Message sent:', message);
  await producer.disconnect();
};

module.exports = sendNotification;
