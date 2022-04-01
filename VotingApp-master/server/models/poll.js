const mongooose = require("mongoose");

const optionSchema = new mongooose.Schema({
  option: String,
  votes: {
    type: Number,
    default: 0
  }
});

const pollSchema = new mongooose.Schema({
  user: {
    type: mongooose.Schema.Types.ObjectId,
    ref: "User"
  },
  question: String,
  options: [optionSchema],
  voted: [{
    type: mongooose.Schema.Types.ObjectId,
    ref: "User"
  }],
  created: {
    type: Date,
    default: Date.now
  }
});

// pollSchema.index({ name: 1 }, { unique: true, background: false });
module.exports = mongooose.model("Poll", pollSchema);
