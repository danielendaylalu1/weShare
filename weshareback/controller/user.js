const User = require("../models/user");
const userRouter = require("express").Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({});
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

    const user = await User.findById(id);
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
    let newuser = req.body;
    console.log(newuser); //console

    newuser = new User(user);
    console.log(newuser); //console

    const user = await newuser.save();
    console.log(user); //console

    return res.status(201).json(user);
  } catch (error) {
    console.log(error); //console

    return res.json(400).json({
      error: error.message,
    });
  }
});
