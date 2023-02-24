import controller from "./controller";
import routes from "./routes";
import prefix from "./prefix";
import { Task } from "./model";

export default {
  controller,
  routes,
  prefix,
  model: Task,
};
