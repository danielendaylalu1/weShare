const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please insert fullname"],
  },
  username: {
    type: String,
    required: [true, "Please insert username"],
    minLength: 4,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: [true, "Please insert a minlength 6 password"],
    minLength: 6,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please insert your phonenumber"],
    unique: true,
    validate: {
      validator: function (v) {
        return /^09\d{8}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    if (returnedObject._id) {
      returnedObject.id = returnedObject._id.toString();
    }
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
