require("dotenv").config();
const postRouter = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

postRouter.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user");
    console.log(posts); //console

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error); //console

    return res.status(400).json({
      error: error.message,
    });
  }
});

postRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id); //console

    const post = await Post.findById(id).populate("user");
    console.log(post); //console

    return res.status(200).json(post);
  } catch (error) {
    console.log(error); //console

    return res.status(400).json({
      error: error.message,
    });
  }
});

postRouter.post("/", async (req, res) => {
  // console.log(req.body, req.headers);

  const getUserTocken = (req) => {
    const authorization = req.get("Authorization");

    if (authorization && authorization.startsWith("Bearer")) {
      return authorization.replace("Bearer", "").trim();
    } else {
      return null;
    }
  };
  try {
    const { location, desc, catagories } = req.body;
    console.log(req.body); //console

    const decodedTocken = jwt.verify(getUserTocken(req), process.env.SECRET);
    if (!decodedTocken.id) {
      return res.status(401).json({
        error: "invalid tocken",
      });
    }

    const user = await User.findById(decodedTocken.id);

    const newPost = new Post({
      location,
      desc,
      catagories,
      user: user.id,
    });
    const post = await newPost.save();
    console.log(post); //console

    console.log(user); //console

    user.posts = user.posts.concat(post.id);
    await user.save();

    return res.status(201).json(post);
  } catch (error) {
    console.log(error); //console

    return res.status(400).json({
      error: error.message,
    });
  }
});

postRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPost = req.body;
    console.log(id, updatedPost); //console

    const post = await Post.findByIdAndUpdate(id, updatedPost, {
      new: true,
      runValidators: true,
      context: "query",
    });
    console.log(post); //console

    return res.status(200).json(post);
  } catch (error) {
    console.log(error); //console

    return res.status(400).json({
      error: error.message,
    });
  }
});

postRouter.put("/like/:id", async (req, res) => {
  const getUserTocken = (req) => {
    const authorization = req.get("Authorization");
    if (authorization && authorization.startsWith("Bearer")) {
      return authorization.replace("Bearer", "").trim();
    } else {
      return null;
    }
  };
  try {
    const postId = req.params.id;
    const secret = process.env.SECRET;
    const { id } = jwt.verify(getUserTocken(req), secret);

    if (!id) {
      return res.status(401).json({
        error: "envalid tocken",
      });
    }

    const user = await User.findById(id);
    console.log(user);
    const updatedPost = {
      likes: req.body.likes.concat({ user: user._id }),
    };
    console.log(user._id, updatedPost);

    const post = await Post.findByIdAndUpdate(postId, updatedPost, {
      new: true,
      runValidators: true,
      context: "query",
    }).populate("user");
    console.log(post);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
});

// postRouter.put("/like/:{id}", async(req, res)=>{

// })

module.exports = postRouter;
