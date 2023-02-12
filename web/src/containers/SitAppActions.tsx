// Actions
import ProjectsActions from "./actions/ProjectsActions";

const SitAppActions = () => {
  return (
    <div className="fixed top-0 left-0 flex w-fit h-fit z-10">
      <ProjectsActions />
    </div>
  );
};

export default SitAppActions;
