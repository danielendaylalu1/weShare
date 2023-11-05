const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please insert username"],
    minLength: 4,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please insert fullname"],
  },
  passwordHash: {
    type: String,
    required: [true, "Please insert a minlength 6 password"],
    minLength: 6,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please insert your phonenumber"],
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
