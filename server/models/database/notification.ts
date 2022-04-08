import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userID: String,
  type: String,
  data: {
    username: String,
    fullname: String,
    settings: mongoose.SchemaTypes.Mixed,
  },
  opened: Boolean,
  date: Number,
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
