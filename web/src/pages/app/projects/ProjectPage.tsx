import { useEffect } from "react";
import { useParams, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "@prismane/core";
// Layouts
import SitPage from "../../../layouts/SitPage";
// Components
import SitShape from "../../../components/basic/SitShape";
import SitNavBar from "../../../components/navigation/SitNavBar";

const ProjectPage = () => {
  const { id } = useParams();

  const projects = useSelector((state: any) => state.projects.projects);

  const project = projects.filter((v: any) => v._id === id)[0];

  useEffect(() => {
    const tasks = async () => {};
  });

  return (
    <>
      {project ? (
        <SitPage>
          <div className="flex flex-col gap-5 w-full h-full">
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
            <h1 className="text-3xl">{project.name}</h1>
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
                <Route path="/tasks" element={<h1>Tasks</h1>} />
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
