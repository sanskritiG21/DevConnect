const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

// POST api - signup
app.post("/signup", async (req, res, next) => {
  try {
    // Creating the instance of the User model
    const user = new User(req.body);
    // user.save() will return the promise so we have to use async await
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error sending user");
  }
});

//GET - feed
app.get("/feed", async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users.length) {
      res.status(404).send("No users");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// GET - user
app.get("/user", async (req, res, next) => {
  const userEmail = req.body.email;

  try {
    const users = await User.find({ email: userEmail });
    if (!users.length) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// GET - firstUser
app.get("/firstUser", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// DELETE

app.delete("/user", async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.body.userID);
    if (!deletedUser) {
      res.status(404).send("User not found");
    } else {
      res.send({ message: "User deleted successfully", data: deletedUser });
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// UPDATE

app.patch("/user", async (req, res, next) => {
  try {
    const userID = req.body.userID;
    const updateBody = req.body;

    const updatedUser = await User.findByIdAndUpdate(userID, updateBody, {
      returnDocument: "after",
    });
    if (!updatedUser) {
      res.status(404).send("User not found");
    } else {
      res.send(updatedUser);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
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
