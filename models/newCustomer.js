const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  user_note: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Customer", memberSchema);