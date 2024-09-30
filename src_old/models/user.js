//  Here we will define what 'user' in our databse is
// What fields 'user' will have

const mongoose = require("mongoose");
const validator = require("validator");
const { ALLOWED_GENDERS } = require("../config/constants");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 4,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true, //this will not let the duplicate entry
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error(`invalid email address: ${value}`);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(`Enter a strong password ${value}`);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!value) {
          throw new Error("Please enter a gender");
        }
        // Custom validate function -- this validate function will only run when you are creating a new object
        if (!ALLOWED_GENDERS.includes(value.trim().toLowerCase())) {
          throw new Error("defined gender is not the valid option");
        }
      },
    },
    photoURL: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error(`invalid photo URL: ${value}`);
        }
      },
    },
    about: {
      type: String,
      default: "This is the default description about my user",
    },
    skills: {
      type: [String], //Array of strings
      validate(value) {
        if (value.length > 5) {
          throw new Error("Only 5 skills are allowed");
        }
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
