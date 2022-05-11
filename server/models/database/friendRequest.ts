import mongoose from "mongoose";

const FriendRequestSchema = new mongoose.Schema({
  from: String,
  to: String,
  userTo: mongoose.SchemaTypes.Mixed,
  userFrom: mongoose.SchemaTypes.Mixed,
});

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);

export default FriendRequest;
