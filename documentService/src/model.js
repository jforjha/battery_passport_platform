const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  fileName: String,
  s3Key: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Document", DocumentSchema);
