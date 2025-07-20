const Passport = require("../src/model");
const { emitEvent } = require("../kafka");

exports.createPassport = async (req, res) => {
  const passport = await Passport.create(req.body);
  await emitEvent("passport.created", passport);
  res.status(201).json(passport);
};

exports.getPassport = async (req, res) => {
  const passport = await Passport.findById(req.params.id);
  res.json(passport);
};

exports.updatePassport = async (req, res) => {
  const passport = await Passport.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  await emitEvent("passport.updated", passport);
  res.json(passport);
};

exports.deletePassport = async (req, res) => {
  await Passport.findByIdAndDelete(req.params.id);
  await emitEvent("passport.deleted", { id: req.params.id });
  res.json({ message: "Deleted" });
};
