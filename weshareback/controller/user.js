const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

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

module.exports = userRouter;
