//  Here we will define what 'user' in our databse is
// What fields 'user' will have

const mongoose = require("mongoose");

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
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        // Custom validate function -- this validate function will only run when you are creating a new object
        const genders = ["male", "female", "others"];
        if (!genders.includes(value)) {
          throw new Error("defined gender is not the valid option");
        }
      },
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "This is the default description about my user",
    },
    skills: {
      type: [String], //Array of strings
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
