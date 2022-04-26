const express = require("express");
const Pet = require("../models/pet.model");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

const router = express.Router();

router.post("/create",authenticate,
authorize(["admin", "user"]), async (req, res) => {
  try {
    const pet = await Pet.create(req.body);
    return res.status(200).send(pet);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
router.get("/all", async (req, res) => {
  try {
    const pets = await Pet.find()
      .populate([{ path: "userId" }])
      .lean()
      .exec();
    return res.status(200).send(pets);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).lean().exec();
    return res.status(200).send(pet);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(pet);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = router;
