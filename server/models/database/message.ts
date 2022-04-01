import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  username: String,
  password: String,
  friends: [String],
  followers: [String],
  following: [String],
  settings: {
    profileColor: String,
    themeColor: String,
    darkTheme: Boolean,
  },
  posts: Array,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
