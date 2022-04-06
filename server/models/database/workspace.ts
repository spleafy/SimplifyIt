import mongoose from "mongoose";

const WorkspaceSchema = new mongoose.Schema({
  administrators: [String],
  users: [String],
  name: String,
  settings: {
    allowUsersToCreate: Boolean,
    workspaceColor: String,
  },
});

const Workspace = mongoose.model("Workspace", WorkspaceSchema);

export default Workspace;
