import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: String,
  users: [String],
  administrators: [String],
  settings: {
    teamColor: String,
  },
});

const Team = mongoose.model("Team", TeamSchema);

export default Team;
