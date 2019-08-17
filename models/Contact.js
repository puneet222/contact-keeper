const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  name: {
    type: "string",
    required: true
  },
  email: {
    type: "string",
    required: true
  },
  phone: {
    type: "string",
    required: true
  },
  type: {
    type: "string",
    default: "personal"
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Contact", ContactSchema);
