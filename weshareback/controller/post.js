const postRouter = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");

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
  try {
    const { location, desc, catagories, userId } = req.body;
    console.log(req.body); //console

    const newPost = new Post({
      location,
      desc,
      catagories,
      user: userId,
    });
    const post = await newPost.save();
    console.log(post); //console

    let user = await User.findById(userId);
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

module.exports = postRouter;
