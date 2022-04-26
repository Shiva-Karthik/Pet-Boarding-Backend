const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    petType: { type: String, reqrired: true },
    gender: { type: String, default: "male", reqrired: true },
    breed: { type: String, reqrired: true },
    size: { type: String, reqrired: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("pet", petSchema);
