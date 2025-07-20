const Document = require("../src/model");
const s3 = require("../src/s3");

exports.upload = async (req, res) => {
  const file = req.file;

  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: file.originalname,
    Body: file.buffer,
  };

  const uploaded = await s3.upload(s3Params).promise();

  const doc = await Document.create({
    fileName: file.originalname,
    s3Key: uploaded.Key,
  });

  res.status(201).json({
    docId: doc._id,
    fileName: doc.fileName,
    createdAt: doc.createdAt,
  });
};

exports.getFile = async (req, res) => {
  const doc = await Document.findById(req.params.docId);
  const url = s3.getSignedUrl("getObject", {
    Bucket: process.env.S3_BUCKET,
    Key: doc.s3Key,
    Expires: 60 * 5,
  });

  res.json({ downloadLink: url });
};
