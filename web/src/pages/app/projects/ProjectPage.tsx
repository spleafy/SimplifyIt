import { useEffect } from "react";
import { ArrowLeft } from "phosphor-react";
import { useParams, Routes, Route, Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "@prismane/core";
// Layouts
import SitPage from "../../../layouts/SitPage";
// Components
import SitShape from "../../../components/basic/SitShape";
import SitNavBar from "../../../components/navigation/SitNavBar";
// Containers
import TasksContainer from "../../../containers/project/TasksContainer";
// Services
import api from "../../../api";
// Redux
import { slice as tasksSlice } from "../../../redux/tasks";
import store from "../../../redux/store";

const ProjectPage = () => {
  const { id } = useParams();

  const projects = useSelector((state: any) => state.projects.projects);

  const project = projects.filter((v: any) => v._id === id)[0];

  useEffect(() => {
    const tasks = async () => {
      if (project) {
        const response = await api.tasks.fetchAll(project._id);

        if (response.status === "SUCCESS" && response.data.tasks) {
          store.dispatch(tasksSlice.actions.add(response.data.tasks));
        }
      }
    };

    tasks();
  }, []);

  return (
    <>
      {project ? (
        <SitPage>
          <div className="flex flex-col gap-5 w-full h-full">
            <Link
              className="flex items-center gap-2 text-base-600 hover:text-primary-500"
              to="/app/projects"
            >
              <ArrowLeft size={24} />
              <span className="text-inherit">Back</span>
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
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl">{project.name}</h1>
                <span>
                  Created on:{" "}
                  {new Date(project.createdAt).toLocaleDateString("en-US")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <SitNavBar
                links={[
                  { element: "Overview", to: "overview" },
                  { element: "Tasks", to: "tasks" },
                  { element: "Settings", to: "settings" },
                ]}
                layoutId="project"
              />
            </div>
            <div className="flex w-full grow">
              <Routes>
                <Route path="/" element={<Navigate to="overview" />} />
                <Route path="/overview" element={<h1>Overview</h1>} />
                <Route path="/tasks" element={<TasksContainer />} />
                <Route path="/settings" element={<h1>Settings</h1>} />
              </Routes>
            </div>
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
