require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const documentRoutes = require("./routes/document.routes");

const app = express();
app.use(express.json());
app.use("/api/documents", documentRoutes);

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () =>
    console.log(`Document service running on port ${process.env.PORT}`)
  );
});
