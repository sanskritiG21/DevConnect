const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const { JWT_PASS } = require("../config/envConfig");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // validate Signup data
    validateSignUpData(req);

    const { password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    //   creating the instance of the User model
    const user = new User({ ...req.body, password: hashedPass });
    await user.save();
    res.send({ message: "user saved successfully" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    } else {
      const isPasswordMatching = bcrypt.compare(password, user.password);
      if (!isPasswordMatching) {
        throw new Error("Invalid credentials");
      } else {
        const token = jwt.sign({ id: user._id }, JWT_PASS);
        const cookie = res.cookie("token", token);
        if (!cookie) {
          throw new Error("Login information not saved");
        } else {
          res.send("Login Successfull");
        }
      }
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    // res.clearCookie("token");

    res.send("Logout done");
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = authRouter;
