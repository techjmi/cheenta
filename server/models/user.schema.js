const mongoose = require("mongoose");
const url =
  "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg";
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
      default: url,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);
const Ch_User = mongoose.model("Ch_User", userSchema);
module.exports = Ch_User;
