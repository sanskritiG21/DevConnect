const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res, next) => {
  const userObject = {
    firstName: "Virat",
    lastName: "kohli",
    age: "34",
    gender: "Male",
    email: "virat@gmail.com",
    password: "1111",
  };
  try {
    // Creating the instance of the User model

    const user = new User(userObject);
    // user.save() will return the promise so we have to use async await
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error sending user");
  }
});

const PORT = 3030;

connectDB()
  .then(() => {
    console.log("Database is connected successfully");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server sunta hai is port pr", PORT);
    });
  })
  .catch((err) => {
    console.log("Database connection Failed", err.message);
  });
