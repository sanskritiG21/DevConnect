// starting point of the application

const express = require("express");

const app = express(); // instance of this express JS application

app.use(
  "/user",
  [
    (req, res, next) => {
      console.log("user1");
      next();
      res.send("Broooooo");
    },
    (req, res, next) => {
      console.log("user 2");
      // res.send("Response 2");
      next();
    },
  ],
  (req, res, next) => {
    console.log("user 3");
    // res.send("Response 3");
    next();
  },
  (req, res, next) => {
    console.log("user 4");
    // res.send("Response 4");
    next();
  }
);

const PORT = 3030;

app.listen(PORT, () => {
  console.log("Server is successfully listening on port", PORT);
});
