const mongoose = require("mongoose");
const memberSchema = mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  userNote: {
    type: String,
    required: true,
  },
});
  
module.exports = mongoose.model("newCustomer", memberSchema);