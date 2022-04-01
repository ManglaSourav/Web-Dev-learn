//To store all message history

const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 10
  },
  message_data: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
    timezone: 'Asia/Calcutta'
  }
});

module.exports = mongoose.model("Messages", MessageSchema);
