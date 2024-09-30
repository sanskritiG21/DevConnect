const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

// POST api - signup
app.post("/signup", async (req, res, next) => {
  try {
    // validate the data
    validateSignUpData(req);

    // hash the password
    const { password } = req.body;
    const hasedPass = await bcrypt.hash(password, 10);

    // Creating the instance of the User model
    const user = new User({ ...req.body, password: hasedPass });
    // user.save() will return the promise so we have to use async await
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    // validate email
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Credentials");
    } else {
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (!isPasswordMatching) {
        throw new Error("Invalid Credentials");
      } else {
        res.send("Login successfull");
      }
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
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
    res.status(400).send({ message: err.message });
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
    res.status(400).send({ message: err.message });
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
    res.status(400).send({ message: err.message });
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
    res.status(400).send({ message: err.message });
  }
});

// UPDATE
app.patch("/user/:userID", async (req, res, next) => {
  try {
    const userID = req.params?.userID;
    const updateBody = req.body;

    // adding check for
    const allowedUpdate = ["firstName", "lastName", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(updateBody).every((k) => {
      return allowedUpdate.includes(k);
    });

    if (!isUpdateAllowed) {
      throw new Error("update is not allowed");
    } else {
      const updatedUser = await User.findByIdAndUpdate(userID, updateBody, {
        returnDocument: "after",
        runValidators: true,
      });
      if (!updatedUser) {
        res.status(404).send("User not found");
      } else {
        res.send(updatedUser);
      }
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
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
