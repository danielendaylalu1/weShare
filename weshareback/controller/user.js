require("dotenv").config();
const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const getTocken = (req) => {
  let authorization = req.get("Authorization");
  if (authorization && authorization.startsWith("Bearer")) {
    return authorization.replace("Bearer", "").trim();
  } else {
    return null;
  }
};

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find({}).populate("posts");
    console.log(users); //console

    return res.status(200).json(users);
  } catch (error) {
    console.log(error); //console

    return res.status(404).json({
      error: error.message,
    });
  }
});

userRouter.get("/profile", async (req, res) => {
  // console.log(req.get("Authorization"), req.headers);

  console.log(getTocken(req));
  try {
    const secret = process.env.SECRET;
    const { id } = jwt.verify(getTocken(req), secret);
    console.log(id);
    if (!id) {
      return res.status(400).json({
        error: "envalid tocken",
      });
    }

    const user = await User.findById(id).populate({
      path: "posts",
      populate: {
        path: "user",
        model: "User",
      },
    });
    // console.log(".........", user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
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

    return res.status(404).json({
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

    return res.status(404).json({
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
      return res.status(401).json({
        message: "user name or password not correct",
      });
    }
    const forTocken = {
      username: user.username,
      id: user.id,
    };
    const secret = process.env.SECRET;
    console.log(secret);
    const tocken = jwt.sign(forTocken, secret, {
      expiresIn: 160 * 160,
    });

    return res.status(200).json({ tocken, user: user });
  } catch (error) {
    console.log(error); //console
    return res.status(404).json({
      error: error.message,
    });
  }
});

userRouter.put("/follow", async (req, res) => {
  try {
    const userFollowedId = req.body.id;
    const secret = process.env.SECRET;
    const { id } = jwt.verify(getTocken(req), secret);
    console.log(id);
    if (!id) {
      return res.status(400).json({
        error: "envalid tocken",
      });
    }

    const user = await User.findById(id);

    const userFollowed = req.body.followers.find((id) => {
      return JSON.stringify(id) === JSON.stringify(user._id);
    });
    let updatedUser = null;
    if (userFollowed) {
      updatedUser = {
        followers: req.body.followers.filter(
          (follow) => follow !== userFollowed
        ),
      };
    } else {
      updatedUser = {
        followers: req.body.followers.concat(user._id),
      };
    }

    const result = await User.findByIdAndUpdate(userFollowedId, updatedUser, {
      new: true,
      runValidators: true,
      context: "query",
    }).populate("posts");

    const userFollowing = user.following.find((id) => {
      return JSON.stringify(id) === JSON.stringify(userFollowedId);
    });
    let updatedUserFollowing = null;
    if (userFollowing) {
      updatedUserFollowing = {
        following: user.following.filter((id) => id !== userFollowing),
      };
    } else {
      updatedUserFollowing = {
        following: user.following.concat(result._id),
      };
    }

    const userFollowingResult = await User.findByIdAndUpdate(
      id,
      updatedUserFollowing,
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    ).populate("posts");

    console.log(userFollowingResult);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error); //console
    return res.status(404).json({
      error: error.message,
    });
  }
});

module.exports = userRouter;

// userRouter.put("/follow", async (req, res) => {
//   try {
//     const followedUserId = req.body.id;
//     const secret = process.env.SECRET;
//     const { id: currentUserId } = jwt.verify(getTocken(req), secret);
//     console.log(currentUserId);

//     if (!currentUserId) {
//       return res.status(400).json({
//         error: "Invalid token",
//       });
//     }

//     const currentUser = await User.findById(currentUserId);
//     const isAlreadyFollowing = currentUser.following.includes(followedUserId);

//     if (isAlreadyFollowing) {
//       currentUser.following = currentUser.following.filter(
//         (id) => id !== followedUserId
//       );
//     } else {
//       currentUser.following = currentUser.following.concat(followedUserId);
//     }

//     const updatedCurrentUser = await currentUser.save();

//     const followedUser = await User.findById(followedUserId);
//     const isAlreadyFollowed = followedUser.followers.includes(currentUserId);

//     if (isAlreadyFollowed) {
//       followedUser.followers = followedUser.followers.filter(
//         (id) => id !== currentUserId
//       );
//     } else {
//       followedUser.followers = followedUser.followers.concat(currentUserId);
//     }

//     const updatedFollowedUser = (await followedUser.save()).populate("posts");

//     console.log(updatedCurrentUser);

//     return res.status(200).json(updatedFollowedUser);
//   } catch (error) {
//     console.log(error);
//     return res.status(404).json({
//       error: error.message,
//     });
//   }
// });
