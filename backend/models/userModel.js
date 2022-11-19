const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a E-Mail"],
    },
    email: {
      type: String,
      required: [true, "Please add a E-Mail"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a Password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema)
