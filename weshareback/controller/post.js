require("dotenv").config();
const postRouter = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const axios = require("axios");
const fs = require("fs");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
});

const getUserTocken = (req) => {
  let authorization = req.get("Authorization");
  if (authorization && authorization.startsWith("Bearer")) {
    return authorization.replace("Bearer", "").trim();
  } else {
    return null;
  }
};

postRouter.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).populate({
      path: "user",
      populate: {
        path: "posts",
        model: "Post",
      },
    });
    console.log(posts); //console

    return res.status(200).json(posts);
  } catch (error) {
    console.log(error); //console

    return res.status(404).json({
      error: error.message,
    });
  }
});

postRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id); //console

    const post = await Post.findById(id).populate({
      path: "user",
      populate: {
        path: "posts",
        model: "Post",
      },
    });
    console.log(post); //console

    return res.status(200).json(post);
  } catch (error) {
    console.log(error); //console

    return res.status(404).json({
      error: error.message,
    });
  }
});

postRouter.post("/", upload.single("file"), async (req, res) => {
  console.log(req.file);
  if (req.fileValidationError) {
    return res.status(400).send(req.fileValidationError);
  }

  try {
    const { location, desc, catagories } = req.body;

    const decodedTocken = jwt.verify(getUserTocken(req), process.env.SECRET);
    if (!decodedTocken.id) {
      return res.status(401).json({
        error: "invalid tocken",
      });
    }

    const user = await User.findById(decodedTocken.id);

    const REGION = "";
    const BASE_HOSTNAME = "storage.bunnycdn.com";
    const HOSTNAME = REGION ? `${REGION}.${BASE_HOSTNAME}` : BASE_HOSTNAME;
    const STORAGE_ZONE_NAME = "weshare";
    const extension = path.extname(req.file.originalname);
    const FILENAME_TO_UPLOAD = `${uuidv4() + "post" + extension}`;
    const ACCESS_KEY = process.env.CDN_API_KEY;

    const fileBuffer = req.file.buffer;
    const url = `https://${HOSTNAME}/${STORAGE_ZONE_NAME}/post/${FILENAME_TO_UPLOAD}`;

    await axios.put(url, fileBuffer, {
      headers: {
        AccessKey: ACCESS_KEY,
        "Content-Type": req.file.mimetype,
      },
    });

    const newPost = new Post({
      location,
      desc,
      catagories,
      image: `https://weshare.b-cdn.net/post/${FILENAME_TO_UPLOAD}`, // URL of the uploaded file
      user: new mongoose.Types.ObjectId(user.id),
    });
    const post = await newPost.save();
    const populatedPost = await Post.findById(post._id).populate("user");
    console.log(post); //console

    console.log(user); //console

    user.posts = user.posts.concat(post.id);

    await user.save();

    return res.status(201).json(populatedPost);
  } catch (error) {
    console.log(error); //console

    return res.status(404).json({
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

    return res.status(404).json({
      error: error.message,
    });
  }
});

postRouter.put("/like/:id", async (req, res) => {
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
    // console.log(user);
    const userLiked = req.body.likes.find((like) => {
      return JSON.stringify(like) === JSON.stringify(user._id);
    });
    let updatedPost = null;
    if (userLiked) {
      updatedPost = {
        likes: req.body.likes.filter((like) => like !== userLiked),
      };
    } else {
      updatedPost = {
        likes: req.body.likes.concat(user._id),
      };
    }

    // console.log(user._id, updatedPost);

    const post = await Post.findByIdAndUpdate(postId, updatedPost, {
      new: true,
      runValidators: true,
      context: "query",
    }).populate("user");
    // console.log(post);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: error.message,
    });
  }
});

postRouter.put("/comment/:id", async (req, res) => {
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
      comment: req.body.data.comment.concat({
        user: user._id,
        text: req.body.text,
      }),
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
    return res.status(404).json({
      error: error.message,
    });
  }
});
// postRouter.put("/like/:{id}", async(req, res)=>{

// })

module.exports = postRouter;
