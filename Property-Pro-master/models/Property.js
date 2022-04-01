const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: true,
    minlength: 5
  },
  desc: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  price: {
    type: String,
    required: true
  },
  propertyImg: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1414353220870-38cc1d0fbf76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
  },
  ownerName: {
    type: String,
    require: true
  },
  ownerNumber: {
    type: String,
    require: true
  },
  amenities: {
    type: String,
    require: true
  },
  size: { type: String, required: true },
  location: {
    type: String,
    required: true
  }
});

const property = mongoose.model("property", propertySchema);

module.exports = property;
