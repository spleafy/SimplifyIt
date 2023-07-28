// Redux
import store from "./store";
import { slice as userSlice } from "./user";
import { slice as projectsSlice } from "./projects";
import { slice as tasksSlice } from "./tasks";

export const schedule = {
  projects: {
    remove: (id: string) => {
      store.dispatch(projectsSlice.actions.remove(id));
      const tasks = store
        .getState()
        .tasks.tasks.filter((t: any) => t._id !== id);
      tasks.forEach((t: any) => {
        schedule.tasks.remove(t._id);
      });
    },
  },
  tasks: {
    remove: (id: string) => {
      store.dispatch(tasksSlice.actions.remove(id));
    },
  },
};
