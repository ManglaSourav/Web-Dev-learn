var socket = io.connect(); 
// Query DOM
var message = document.getElementById("message"),
  btn = document.getElementById("send"),
  output = document.getElementById("output");

// Emit events
btn.addEventListener("click", function() {
  socket.emit("onNumber", {
    message: message.value
  });
  message.value = "";
});
socket.on("initial", function(data) {
  output.innerHTML = "<p>" + data + "</p>";
});

// Listen for events
socket.on("onNumber", function(data) {
  output.innerHTML = "<p>" + data + "</p>";
});

socket.on("changed", function(data) {
  output.innerHTML = "<p>" + data + "</p>";
});
