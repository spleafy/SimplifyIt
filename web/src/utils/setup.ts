// Services
import api from "../api";
// Redux
import store from "../redux/store";
import { slice as userSlice } from "../redux/user";
import { slice as projectsSlice } from "../redux/projects";

const user = async () => {
  const response = await api.user.fetch();

  if (response.status === "SUCCESS" && response.data.user) {
    store.dispatch(userSlice.actions.update(response.data.user));
  } else {
    // navigate("/auth");
  }
};

const projects = async () => {
  const response = await api.projects.fetch();

  if (response.status === "SUCCESS" && response.data.projects) {
    store.dispatch(projectsSlice.actions.init(response.data.projects));
  } else {
    console.error("ERROR! --project-setup--");
  }
};

const setup = async () => {
  await user();
  await projects();
};

export default setup;
