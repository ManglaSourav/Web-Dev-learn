const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const homeRoutes = require("./routes/index");
var app = express();

// Middlewares
//for logging everthing
app.use(morgan("dev"));

//parsing the incoming request object into json format
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//allow cross origin resource sharing
app.use(cors());

//to handle routes
app.use("/", homeRoutes);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// console.log(path.resolve(express.static("client/build")))

//handle errors when page is not found or specified request is not handled
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error); //this will now forwards this error request
});

mongoose
  .connect(
    "mongodb+srv://sourav:sourav@123@node-bookmark-manager-2h8zl.mongodb.net/local_library?retryWrites=true",
    {
      useCreateIndex: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("mongodb connecton established successfully"))
  .catch(err => console.log(err));

//server configuration
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
