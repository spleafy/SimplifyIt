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
  settings: {
    initialSetup: Boolean,
    profile: {
      profileColor: String,
      profilePicture: Boolean,
      themeColor: String,
      darkTheme: Boolean,
    },
    security: {
      twoFactor: Boolean,
    },
    sound: {
      success: Boolean,
      warning: Boolean,
      error: Boolean,
    },
    notification: {
      post: Boolean,
      friendRequest: Boolean,
    },
  },
  posts: [String],
  friends: [String],
  teams: [String],
  workspaces: [String],
  activeWorkspace: String,
});

const User = mongoose.model("User", userSchema);

export default User;
