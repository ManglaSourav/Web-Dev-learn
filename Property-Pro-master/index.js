const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const property = require("./routes/api/property");
const app = express();
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const url =
  "mongodb+srv://sourav:sourav@123@node-bookmark-manager-2h8zl.mongodb.net/property?retryWrites=true&w=majority";
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/users", users);
app.use("/api/property", property);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`Server is running on port:${port}`);
});
