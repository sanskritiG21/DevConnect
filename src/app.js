// starting point of the application
const express = require("express");

const app = express(); // instance of this express JS application

app.get("/getUserData", (req, res, next) => {
  try {
    throw new Error("bhai code fat gaya");
  } catch (err) {
    res.status(500).send("error handle kardunga pura pura");
  }
});

app.use("/", (err, req, res, next) => {
  // handle error gracefully
  if (err) {
    console.log(err);
    res.status(500).send("lol yaha send krna tha error");
  }
});

const PORT = 3030;
app.listen(PORT, () => {
  console.log("Server is successfully listening on port", PORT);
});
