require('dotenv').config();
const express = require('express');
const startKafkaConsumer = require('./kafka/consumer');

const app = express();
const PORT = process.env.PORT || 4003;

app.get('/', (req, res) => {
  res.send('Notification Service running');
});

app.listen(PORT, async () => {
  console.log(`Notification Service port ${PORT}`);
  try {
    await startKafkaConsumer();
  } catch (err) {
    console.error('Kafka Error:', err);
  }
});
