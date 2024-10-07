const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRoute = express.Router();

// Post - /request/send/:status/:userId
requestRoute.post(
  "/request/send/:status/:receiverId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user.id;
      const toUserId = req.params.receiverId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      // case 1: status should be only ignored or interested;
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid Status");
      }

      // case 2: user should be only able to send request to reciver once, and if there is already a request from  the users side then he should not be able to send request;
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingRequest) {
        throw new Error("Connection already exists");
      }

      // case 3: receiverID should not be able random, It should be a valid reciever, check from DB
      const validReceiver = await User.findById(toUserId);

      if (!validReceiver) {
        return res.status(404).json({ message: "User doesn't exist" });
      }

      // case 4: user should not be able to send req to himself - handled in connectionRequestModel

      // make the request;
      const data = await ConnectionRequest.create({
        fromUserId,
        toUserId,
        status,
      });

      return res.json({
        message:
          status === "ignored"
            ? `${req.user.firstName} disliked ${validReceiver.firstName}`
            : `${req.user.firstName} sent request to ${validReceiver.firstName}`,
        data,
      });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
);

// POST - /request/review/:status/:connectionId
requestRoute.post(
  "/request/review/:status/:connectionId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInRequest = req.user;
      const { status, connectionId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const connectionReq = await ConnectionRequest.findOne({
        _id: connectionId,
        toUserId: loggedInRequest.id,
        status: "interested",
      });

      if (!connectionReq) {
        return res.status(400).json({ message: "Connection not found" });
      }

      connectionReq.status = status;

      await connectionReq.save();

      res.json({ message: `connection request accepted` });
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  }
);

module.exports = requestRoute;
