const express = require("express");
const multer = require("multer");
const auth = require("../src/auth");
const { upload, getFile } = require("../src/controller");

const uploadMiddleware = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/upload", auth, uploadMiddleware.single("file"), upload);
router.get("/:docId", auth, getFile);

module.exports = router;
