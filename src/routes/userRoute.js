// GET - /user/connections
// GET - /user/request/recieved
// GET - /user/feed

const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { VISIBLE_USER_INFO } = require("../constant/populate/user");

const userRoute = express.Router();

// GET - /user/connections - all the accepted one
userRoute.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInRequest = req.user;

    const getAllConnection = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInRequest.id, status: "accepted" },
        { fromUserId: loggedInRequest.id, status: "accepted" },
      ],
    })
      .populate("toUserId", VISIBLE_USER_INFO)
      .populate("fromUserId", VISIBLE_USER_INFO);

    if (!getAllConnection) {
      return res.status(404).json({ message: "No Connections Found" });
    }

    const modifiedData = getAllConnection.map((row) => {
      if (row.fromUserId._id.equals(loggedInRequest.id)) {
        return row.toUserId;
      }

      return row.fromUserId;
    });

    res.json(modifiedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET - /user/request/recieved
userRoute.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const getAllIncomingRequest = await ConnectionRequest.find({
      toUserId: loggedInUser.id,
      status: "interested",
    }).populate("fromUserId", VISIBLE_USER_INFO);

    if (!getAllIncomingRequest) {
      return res.status(404).json({ message: "No Request found" });
    }

    const data = getAllIncomingRequest.map((row) => row.fromUserId);

    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRoute;
