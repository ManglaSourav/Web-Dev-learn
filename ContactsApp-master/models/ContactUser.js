//Mongoose model to store all contacts

const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4
  },
  mobileNumber: {
    type: String,
    required: true,
    validate: {
      validator: validator.isMobilePhone,
      message: "{value} is not a number"
    }
  }
});

module.exports = mongoose.model("ContactUser", UserSchema);
