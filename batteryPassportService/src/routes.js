const express = require("express");
const {
  createPassport,
  getPassport,
  updatePassport,
  deletePassport,
} = require("../src/controller");
const auth = require("../src/auth");

const router = express.Router();

router.post("/", auth("admin"), createPassport);
router.get("/:id", auth(), getPassport);
router.put("/:id", auth("admin"), updatePassport);
router.delete("/:id", auth("admin"), deletePassport);

module.exports = router;
