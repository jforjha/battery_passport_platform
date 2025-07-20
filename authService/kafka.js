require("dotenv").config();

const { Kafka } = require("kafkajs"); 

console.log("Kafka broker from env:", process.env.KAFKA_BROKER); 

const kafka = new Kafka({
  clientId: "auth-service",
  brokers: [process.env.KAFKA_BROKER], 
});

module.exports = kafka;
