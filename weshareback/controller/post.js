const postRouter = require("express").Router();
const Post = require("../models/post");

postRouter.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
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

    const post = await Post.findById(id);
    console.log(post); //console

    return res.status(200).json(post);
  } catch (error) {
    console.log(error); //console

    return res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = postRouter;
