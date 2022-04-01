const express = require("express");
const exec = require("child_process").exec;
const fs = require("fs");
const socket = require("socket.io");
const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 3000;
var server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

var io = socket(server); // making server with socket
io.on("connection", socket => {
  console.log("made socket connection", socket.id);

  // initial  data sending
  var n = 10;
  exec(`tail -${n} test.txt`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    io.sockets.emit("initial", stdout);
  });

  // Handle when user enter number of lines
  socket.on("onNumber", function(data) {
    exec(`tail -${data.message} test.txt`, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        // res.send(err);
        return;
      }
      io.sockets.emit("onNumber", stdout); //send data to client
    });
  });

  fs.watch("test.txt", (eventType, filename) => {
    //watching file data changes
    // console.log(`event type is: ${eventType}`);
    if (filename) {
      exec("tail -10 test.txt", (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          // res.send(err);
          return;
        }
        // console.log(stdout);
        io.sockets.emit("changed", stdout);
      });
    } else {
      console.log("Error Occured");
    }
  });
});
