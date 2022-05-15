import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  username: String,
  password: String,
  jobtitle: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  friends: [String],
  followers: [String],
  following: [String],
  settings: {
    profileColor: String,
    themeColor: String,
    darkTheme: Boolean,
    initialSetup: Boolean,
    twoFactor: Boolean,
    sound: {
      success: Boolean,
      warning: Boolean,
      error: Boolean,
    },
  },
  posts: Array,
});

const User = mongoose.model("User", userSchema);

export default User;
