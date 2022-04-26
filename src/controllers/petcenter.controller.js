const express = require("express");
const petCenterSchema = require("../models/petcenter.model");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

const router = express.Router();

router.post(
  "/create",
  authenticate,
  authorize(["admin", "user"]),
  async (req, res) => {
    try {
      const petcenter = await petCenterSchema.create(req.body);
      return res.status(200).send(petcenter);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
);
router.get("/all", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const size = req.query.size || 1;
    const petcenters = await petCenterSchema.find()
      .skip((page - 1) * size)
      .limit(size)
      .populate([{ path: "userId" }])
      .lean()
      .exec();
    const totalPages = Math.ceil((await petCenterSchema.find().countDocuments()) / size);

    return res.status(200).send(petcenters,totalPages);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const petcenter = await petCenterSchema.findById(req.params.id).lean().exec();
    return res.status(200).send(petcenter);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const petcenter = await petCenterSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(petcenter);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = router;
