const mongoose = require("mongoose");
const memberSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userHwid: {
    type: String,
    required: true,
  },
  userExpiringTime: {
    type: String,
    required: true,
  },
  userMcAdress: {
    type: String,
    required: true,
  },
});
  
module.exports = mongoose.model("Customer", memberSchema);