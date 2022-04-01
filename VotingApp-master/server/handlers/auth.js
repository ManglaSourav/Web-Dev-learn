const jwt = require("jsonwebtoken");

const db = require("../models");

const SECRET = "thisistempsecret";
exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await db.User.create(req.body);
    const { id, username } = user;

    const token = jwt.sign({ id, username }, SECRET);

    res.status(201).json({ id, username, token });
  } catch (err) {
    if (err.code === 11000) {
      //mongo return 11000 code is user is already exist

      err.message = "sorry,that username is already taken";
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await db.User.findOne({ username: req.body.username });
    const { id, username } = user;
    console.log(user);
    const valid = await user.comparedPassword(req.body.password);
    if (valid) {
      const token = jwt.sign({ id, username }, SECRET);
      res.send({
        // res.json vs res.send
        id,
        username,
        token
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    err.message = "Invalid Username/password";
    next(err);
  }
};
