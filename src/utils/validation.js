const validator = require("validator");
const {
  ALLOWED_FIELD_FOR_SIGNUP,
  ALLOWED_FIELD_FOR_PROFILE_UPDATE,
} = require("../constant/allowedValues");

const validateSignUpData = (req) => {
  const { firstName, email, password } = req.body;

  const isUpdateAllowed = Object.keys(req.body).every((k) =>
    ALLOWED_FIELD_FOR_SIGNUP.includes(k)
  );

  if (!isUpdateAllowed) {
    throw new Error("Value entered is not allowed");
  }
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

const validateProfileUpdate = (req) => {
  const isUpdateAllowed = Object.keys(req.body).every((k) =>
    ALLOWED_FIELD_FOR_PROFILE_UPDATE.includes(k)
  );

  if (!isUpdateAllowed) {
    throw new Error("Value entered not allowed ");
  }
};

module.exports = {
  validateSignUpData,
  validateProfileUpdate,
};
