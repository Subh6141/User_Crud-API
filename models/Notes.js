const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      min: 30,
      max:200,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
