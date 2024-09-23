// starting point of the application

const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const app = express(); // instance of this express JS application

// authorising the admin routes using middleware
app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res, next) => {
  res.send("user data here");
});

app.get("/admin/getAllData", (req, res, next) => {
  res.send("All data of user is here");
});

app.delete("/admin/deleteAllData", (req, res, next) => {
  res.send("User data deleted successfully");
});

const PORT = 3030;

app.listen(PORT, () => {
  console.log("Server is successfully listening on port", PORT);
});
