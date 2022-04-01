const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const pollsSchema = new mongoose.Schema({

//   type: mongoose.Schema.Types.ObjectID, ref: "Poll"
// })
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  created: {
    type: Date,
    default: Date.now
  },
  polls: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll"
    }
  ]
});

userSchema.pre("save", async function(next) {
  //it takes effect before saving a document to database
  try {
    // all async method need to put in try catch block
    if (!this.isModified("password")) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparedPassword = async function(attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    next(err);
  }
};
module.exports = mongoose.model("User", userSchema);
