import { ArrowLeft, Plus, PencilSimple } from "phosphor-react";
import { useParams, Routes, Route, Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader, Button, Separator } from "@prismane/core";
// Layouts
import SitPage from "../../../layouts/SitPage";
// Components
import SitShape from "../../../components/basic/SitShape";
import SitNavBar from "../../../components/navigation/SitNavBar";
// Containers
import OverviewContainer from "../../../containers/project/OverviewContainer";
import TasksContainer from "../../../containers/project/TasksContainer";
// Utils
import { events } from "../../../utils/utils";

const ProjectPage = () => {
  const { id } = useParams();

  const projects = useSelector((state: any) => state.projects.projects);

  const project = projects.filter((v: any) => v._id === id)[0];

  const taskActionEvent = new CustomEvent(events.task, {
    detail: {
      id,
    },
  });

  const projectUpdateEvent = new CustomEvent(events.project.update, {
    detail: {
      id,
    },
  });

  return (
    <>
      {project ? (
        <SitPage>
          <div className="flex flex-col">
            <div className="flex flex-col gap-5 w-full relative">
              <Link
                className="flex items-center gap-2 text-base-600 hover:text-primary-500"
                to="/app/projects/"
              >
                <ArrowLeft size={24} />
                <span className="text-inherit">All Projects</span>
              </Link>
              <div className="flex gap-8">
                <div
                  className="flex justify-center items-center w-36 aspect-square rounded-md"
                  style={{ backgroundColor: project.settings.color }}
                >
                  <SitShape
                    shape={project.settings.shape}
                    color="white"
                    className="w-12 h-12"
                  />
                </div>
                <div className="flex flex-col justify-between gap-2">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-4xl">{project.name}</h1>
                    <span>
                      Created on:{" "}
                      {new Date(project.createdAt).toLocaleDateString("en-US")}
                    </span>
                  </div>
                  <div className="flex items-center gap-5 mr-10">
                    <Button
                      variant="primary"
                      icon={<Plus />}
                      onClick={() => {
                        document.dispatchEvent(taskActionEvent);
                      }}
                    >
                      Add Task
                    </Button>
                    <Button
                      icon={<PencilSimple />}
                      variant="tertiary"
                      color="base"
                      onClick={() => {
                        document.dispatchEvent(projectUpdateEvent);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
              <SitNavBar
                links={[
                  { element: "Overview", to: "overview" },
                  { element: "Tasks", to: "tasks" },
                ]}
                layoutId="project"
              />
              <Separator className="absolute bottom-0 left-0 w-full !my-0" />
            </div>
            <SitPage className="!px-0 !py-10">
              <Routes>
                <Route path="/" element={<Navigate to="overview" />} />
                <Route path="/overview" element={<OverviewContainer />} />
                <Route path="/tasks" element={<TasksContainer />} />
              </Routes>
            </SitPage>
          </div>
        </SitPage>
      ) : (
        <>
          <Loader className="text-primary-500" />
        </>
      )}
    </>
  );
};

export default ProjectPage;
