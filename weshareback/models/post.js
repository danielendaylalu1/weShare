const mongoose = require("mongoose");

const postShema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, "Please enter location"],
  },
  desc: {
    type: String,
    minLength: [25, "Description must be at least 25 characters long"],
    required: [true, "Please enter a description"],
  },
  catagories: {
    type: [String],
    required: [true, "Please choose at least one category"],
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    default: [],
  },
  comment: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: { type: String, required: true },
      },
    ],
    default: [],
  },

  image: {
    type: String,
    required: [false, "image field is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

postShema.set("toJSON", {
  transform: (document, returnedObject) => {
    if (returnedObject._id) {
      returnedObject.id = returnedObject._id.toString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const Post = mongoose.model("Post", postShema);

module.exports = Post;
