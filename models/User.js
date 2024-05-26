const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 5,
      max: 30,
      required: true,
    },
    email: {
      type: String,
      min: 5,
      max: 50,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      min: 5,
      max: 100,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
