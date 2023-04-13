
const express = require("express"); // import modules
const app = express(); // app constant by using express
const React = require('react');
const ReactDOM = require('react-dom');
const port = 8080



app.use(express.static("public")); // for express to serve up the public folder as a static resource

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/Home.html");
});

app.listen(port, function () {
  console.log("Server started on port: "+port);
});
