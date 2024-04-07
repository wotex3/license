const mongoose = require("mongoose");
const memberSchema = mongoose.Schema({
  api_key: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});
  
module.exports = mongoose.model("NewAdmin", memberSchema);