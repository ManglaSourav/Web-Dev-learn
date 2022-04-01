const express = require("express");
const app = express();
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const path = require("path");
const keys = require('./config/keys')

// set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day expiry time for session
    keys: [keys.session.cookieKey]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb locally
mongoose.connect("mongodb://localhost:27017/oauth", () => {
  console.log("connected to mongodb");
});

// set up routes

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// create home page
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(3000, () => {
  console.log("app now listening for request on port 3000");
});
