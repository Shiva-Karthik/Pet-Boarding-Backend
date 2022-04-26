const mongoose = require("mongoose");

const petCenterSchema = new mongoose.Schema(
  {
    centerName: { type: String, reqrired: true },
    city: { type: String, reqrired: true },
    address: { type: String, reqrired: true },
    costPerDay: { type: Number, reqrired: true },
    verified: { type: String, reqrired: true },
    Rating: { type: String, reqrired: true },
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

module.exports = mongoose.model("petcenter", petCenterSchema);
