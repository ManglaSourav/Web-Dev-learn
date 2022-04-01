const jwt = require("jsonwebtoken");
const SECRET = "thisistempsecret";

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        next(Error("falied to authenticate token"));
      } else {
        req.decoded = decoded;
        next();// sending users data to the next function to be used
      }
    });
  } else {
    next(Error("No token provided"));
  }
};
