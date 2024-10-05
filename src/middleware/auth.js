const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_PASS } = require("../config/envConfig");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not valid");
    }

    const { id } = await jwt.verify(token, JWT_PASS);

    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = {
  userAuth,
};
