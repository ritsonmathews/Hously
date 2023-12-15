const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
    token: {
      type: String,
      required: true,
      trim: true,
    },
    notificationToken: {
      type: String,
      trim: true,
    },  
  },
  { timestamps: true }
);
module.exports = mongoose.model("Token", tokenSchema);
