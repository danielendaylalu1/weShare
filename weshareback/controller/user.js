require("dotenv").config();
const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({}).populate("posts");
    console.log(users); //console

    return res.status(200).json(users);
  } catch (error) {
    console.log(error); //console

    return res.status(400).json({
      error: error.message,
    });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id); //console

    const user = await User.findById(id).populate("posts");
    console.log(user); //console

    return res.status(200).json(user);
  } catch (error) {
    console.log(error); //console

    return res.status(400).json({
      error: error.message,
    });
  }
});

userRouter.post("/signup", async (req, res) => {
  try {
    let { username, name, password, phoneNumber } = req.body;
    console.log(req.body); //console

    const passwordHash = await bcrypt.hash(password, 10);

    newuser = new User({
      username,
      name,
      passwordHash,
      phoneNumber,
    });
    console.log(newuser); //console

    const user = await newuser.save();
    console.log(JSON.stringify(user)); //console

    return res.status(201).json({
      username: user.username,
      name: user.name,
      phoneNumber: user.phoneNumber,
      id: user.id,
    });
  } catch (error) {
    console.log(error); //console

    return res.status(400).json({
      error: error.message,
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate("posts");
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
      res.json(401).json({
        message: "user name or password not correct",
      });
    }
    const forTocken = {
      username: user.username,
      id: user.id,
    };
    const secret = process.env.SECRET;
    console.log(secret);
    const token = jwt.sign(forTocken, secret, {
      expiresIn: 60 * 60,
    });

    res.status(200).json({ token, user: user });
  } catch (error) {
    console.log(error); //console
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = userRouter;
