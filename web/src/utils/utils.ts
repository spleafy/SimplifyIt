import colors from "tailwindcss/colors";

export const getColors = () => {
  return {
    slate: colors["slate"],
    red: colors["red"],
    orange: colors["orange"],
    green: colors["green"],
    sky: colors["sky"],
    indigo: colors["indigo"],
    pink: colors["pink"],
  };
};

export const events = {
  project: "action-projects",
  task: "action-tasks",
};

export default { events };
