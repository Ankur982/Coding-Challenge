const mongoose = require("mongoose");


const accountSchema = new mongoose.Schema({
  code: {
      type: String,
      required: true,
      unique: true
  },
  name: {
      type: String,
      required: true
  },
  balance: {
      type: Number,
      default: 0
  }
});

module.exports = mongoose.model("Account", accountSchema);