const express = require("express");
const { userAuth } = require("../middleware/auth");
const { validate } = require("../models/user");
const { validateProfileUpdate } = require("../utils/validation");
const User = require("../models/user");

const profileRoute = express.Router();

profileRoute.get("/profile/view", userAuth, (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

profileRoute.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    validateProfileUpdate(req);
    // const updateUser = await User.findByIdAndUpdate(
    //   user.id,
    //   { ...req.body },
    //   { returnDocument: "after" }
    // );
    // if (!updateUser) {
    //   throw new Error("User not found");
    // }
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = profileRoute;
