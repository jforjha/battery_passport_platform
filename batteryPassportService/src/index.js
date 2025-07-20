require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { connectKafka } = require("../kafka");
const passportRoutes = require("./src/routes");

const app = express();
app.use(express.json());
app.use("/api/passports", passportRoutes);

mongoose.connect(process.env.MONGO_URI, async () => {
  await connectKafka();
  console.log("Connected to Mongo & Kafka");
  app.listen(process.env.PORT, () =>
    console.log(`Battery Passport Service running on port ${process.env.PORT}`)
  );
});
