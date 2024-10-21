const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, email, password } = req.body;

  if (!firstName) {
    throw new Error("Enter a valid name");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Enter a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

module.exports = {
  validateSignUpData,
};
