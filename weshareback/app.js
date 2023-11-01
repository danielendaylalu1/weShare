require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const userRouter = require("./controller/user");
const postRouter = require("./controller/post");

const app = express();

mongoose.set("strictQuery", false);

(async () => {
  try {
    const url = process.env.DATABASE_URL;
    const res = await mongoose.connect(url);
    console.log("connected to mongoose");
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
})();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

module.exports = app;
