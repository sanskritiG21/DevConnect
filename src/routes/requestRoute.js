const express = require("express");
const { userAuth } = require("../middleware/auth");

const requestRoute = express.Router();

requestRoute.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(`${user.firstName} sent a connection request`);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = requestRoute;
