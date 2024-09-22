// starting point of the application

const express = require("express");

const app = express(); // instance of this express JS application

app.use("/", (req, res) => {
  res.send("Dashboard");
});

app.use("/hello", (req, res) => {
  res.send("Hello world");
});

app.use("/test", (req, res) => {
  // request handler function
  res.send("hello from the server");
});

const PORT = 3030;
app.listen(PORT, () => {
  console.log("Server is successfully listening on port", PORT);
});
