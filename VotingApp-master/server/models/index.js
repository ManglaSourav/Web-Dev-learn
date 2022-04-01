const mongoose = require("mongoose");

mongoose.set("debug", true); //logout every transaction from database
mongoose.connect("mongodb://localhost:27017/vote", { useNewUrlParser: true, useCreateIndex: true});

module.exports.Poll = require("./poll");
module.exports.User = require("./user");
