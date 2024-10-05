const ALLOWED_FIELD_FOR_SIGNUP = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "email",
  "password",
  "photoURL",
  "about",
  "skills",
];

const ALLOWED_FIELD_FOR_PROFILE_UPDATE = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "photoURL",
  "about",
  "skills",
];

module.exports = {
  ALLOWED_FIELD_FOR_SIGNUP,
  ALLOWED_FIELD_FOR_PROFILE_UPDATE,
};
