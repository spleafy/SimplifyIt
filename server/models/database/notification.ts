import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userID: String,
  type: String,
  message: String,
  data: mongoose.SchemaTypes.Mixed,
  opened: Boolean,
  date: Date,
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
