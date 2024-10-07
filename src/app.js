const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const { PORT } = require("./config/envConfig");

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/authRoute");
const profileRoute = require("./routes/profileRoute");
const requestRoute = require("./routes/requestRoute");
const userRoute = require("./routes/userRoute");

app.use("/", authRouter);
app.use("/", profileRoute);
app.use("/", requestRoute);
app.use("/", userRoute);

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
